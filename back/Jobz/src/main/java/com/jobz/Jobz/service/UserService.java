package com.jobz.Jobz.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialBlob;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.jobz.Jobz.entity.ContactForm;
import com.jobz.Jobz.entity.Job;
import com.jobz.Jobz.entity.JobObject;
import com.jobz.Jobz.entity.PdfDocument;
import com.jobz.Jobz.entity.SearchForm;
import com.jobz.Jobz.entity.User;
import com.jobz.Jobz.exception.UserException;
import com.jobz.Jobz.repository.JobRepository;
import com.jobz.Jobz.repository.PdfDocumentRepository;
import com.jobz.Jobz.repository.UserRepository;
import com.opencsv.bean.CsvToBeanBuilder;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private PdfDocumentRepository pdfDocumentRepository;

	// GET User
	public User getUser(int userId) throws UserException {
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent()) {
			return user.get();
		} else {
			throw new UserException("User not found!");
		}
	}

	// Get All Jobs
	public List<JobObject> getAllJobs() {
		String fileName = "src/main/resources/static/Jobz.csv";
		try {
			List<JobObject> jobz;

			jobz = new CsvToBeanBuilder<JobObject>(new FileReader(fileName)).withType(JobObject.class).build().parse();
			if (!jobz.isEmpty()) {
				return jobz;
			}
		} catch (IllegalStateException e) {
			e.getMessage();
		} catch (FileNotFoundException e) {
			e.getMessage();
		}
		return null;
	}

	public List<JobObject> getJobsBySearch(SearchForm searchForm) {
		String fileName = "src/main/resources/static/Jobz.csv";

		List<JobObject> finalJobs = new ArrayList<JobObject>();

		try {
			List<JobObject> jobz = new CsvToBeanBuilder<JobObject>(new FileReader(fileName)).withType(JobObject.class)
					.build().parse();
			if (!jobz.isEmpty()) {

				finalJobs = jobz.stream().filter(j -> j.getJobTitle().contains(searchForm.getTitle()))
						.collect(Collectors.toList());

				finalJobs = finalJobs.stream().filter(j -> j.getLocation().contains(searchForm.getLocation()))
						.collect(Collectors.toList());

				finalJobs = finalJobs.stream().filter(j -> j.getJobDescription().contains(searchForm.getDescription()))
						.collect(Collectors.toList());

				return finalJobs;
			}
		} catch (IllegalStateException e) {
			e.getMessage();
		} catch (FileNotFoundException e) {
			e.getMessage();
		}
		return null;
	}

	public static String readAll(Reader rd) throws IOException {
		StringBuilder sb = new StringBuilder();
		int cp;
		while ((cp = rd.read()) != -1) {
			sb.append((char) cp);
		}
		return sb.toString();
	}

	public HashMap<String, Float> getCommonWords() throws IOException {
		System.out.println("Flask Connection");
		// make connection with Python FlaskAPI
		URL url = new URL("http://127.0.0.1:5000/");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");
		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
		}
		// get data from response
		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		JSONObject json = null;

		// read all data to string variable
		String jsonText = readAll(br);

		// convert text to JSON Object
		json = new JSONObject(jsonText);

		// Create a Hash Map To make response readable (key, value)
		ObjectMapper mapper = new ObjectMapper();
		TypeFactory typeFactory = mapper.getTypeFactory();
		MapType mapType = typeFactory.constructMapType(HashMap.class, String.class, Float.class);
		HashMap<String, Float> map = mapper.readValue(new StringReader(json.toString()), mapType);

		conn.disconnect();
		return map;
	}

	// Saved Jobs
	public List<JobObject> getSavedJobs(User user) {
		List<JobObject> jobz = getAllJobs();
		List<JobObject> favJobs = new ArrayList<JobObject>();
		if (!jobz.isEmpty()) {
			user.getUserJobs().forEach(j -> {
				if (j.isSavedJob()) {
					favJobs.add(jobz.get(j.getJobId()));
				}
			});
		}
		return null;
	}

	private JobObject getJobObjectById(int jobId) {
		List<JobObject> jobz = getAllJobs();
		JobObject jobObject = jobz.stream().filter(job -> job.getId() == jobId).findAny().get();
		return jobObject;
	}

	// Save Job
	public User saveJob(int userId, int jobId) throws UserException {
		try {
			User dbUser = userRepository.findById(userId).orElseThrow(() -> new UserException("User is not exists"));
			JobObject jobObject = getJobObjectById(jobId);
			if (jobObject != null) {

				List<Job> userJobs = new ArrayList<>();

				userJobs.addAll(dbUser.getUserJobs());

				Job dbJob = userJobs.stream().filter(jobObj -> jobObj.getJobId() == jobObject.getId()).findAny()
						.orElse(null);

				boolean isSaved = false;

				System.out.println(dbJob);
				if (dbJob != null) {
					if (dbJob.isSavedJob()) {
						isSaved = true;
					} else {
						dbJob.setSavedJob(true);
						jobRepository.save(dbJob);
					}
				}

				if (!isSaved && dbJob == null) {
					Job newJob = jobRepository.save(new Job(jobId, false, true, null, dbUser));
					dbUser.getUserJobs().add(newJob);
					userRepository.save(dbUser);
					return dbUser;
				} else {
					if (dbJob != null && isSaved) {
						return unsaveJob(dbUser, jobId);
					}
				}
			}
			return dbUser;
		} catch (UserException e) {
			throw new UserException(e.getMessage());
		}
	}

	public User unsaveJob(User user, int jobId) {
		Optional<Job> job = jobRepository.findByJobId(jobId);
		if (job.isPresent()) {
			if (job.get().isJobReceived()) {
				job.get().setSavedJob(false);
				jobRepository.save(job.get());
			} else {
				user.getUserJobs().remove(job.get());
				userRepository.save(user);
				jobRepository.delete(job.get());
			}
			return user;
		}
		return user;
	}

	public List<JobObject> getUserJobs(int userId) {
		Optional<User> dbUser = userRepository.findById(userId);
		if (dbUser.isPresent()) {
			List<Job> userJobs = new ArrayList<>(dbUser.get().getUserJobs());
			List<JobObject> userJobsObject = new ArrayList<>();
			for (int i = 0; i < userJobs.size(); i++) {
				userJobsObject.add(getJobObjectById(userJobs.get(i).getJobId()));
			}
			return userJobsObject;
		}
		return new ArrayList<>();
	}

	// uploadCV and send apply to job
	public boolean uploadAndSendCV(int userId, int jobId, PdfDocument pdfDocument, MultipartFile cvFile) {
		boolean flag = false;
		Optional<User> dbUser = userRepository.findById(userId);
		// check if user exist in DB
		if (dbUser.isPresent()) {
			// check if cv file not empty
			if (!cvFile.getOriginalFilename().isEmpty()) {
				// get user jobs to check if the job exist in saved list
				List<Job> userJobs = new ArrayList<>();
				userJobs.addAll(dbUser.get().getUserJobs());

				try {
					Blob blob = new SerialBlob(cvFile.getBytes());

					pdfDocument.setFilename(cvFile.getOriginalFilename());
					pdfDocument.setContent(blob);
					pdfDocument.setContentType(cvFile.getContentType());
				} catch (IOException | SQLException e) {
					e.printStackTrace();
				}

				try {
					pdfDocument.setUser(dbUser.get());
					pdfDocumentRepository.save(pdfDocument);
					dbUser.get().getPdfDocuments().add(pdfDocument);
				} catch (Exception e) {
					e.printStackTrace();
				}

				// loop over the saved jobs
				for (int i = 0; i < userJobs.size(); i++) {
					// if the job saved then set job received to true and update user in DB
					if (userJobs.get(i).getJobId() == jobId) {
						userJobs.get(i).setJobReceived(true);
						dbUser.get().setUserJobs(userJobs);

						userRepository.save(dbUser.get());
						flag = true;

						return true;
					}
				}
				// if job not exist in user saved jobs then create new row in DB and update user
				if (!flag) {
					jobRepository.save(new Job(jobId, true, false, pdfDocument, dbUser.get()));
					return true;
				}
			}
		}
		return false;
	}

	// uploadCV to Profile
	public boolean uploadCV(int userId, PdfDocument pdfDocument, MultipartFile cvFile) {
		Optional<User> dbUser = userRepository.findById(userId);
		// check if user exist in DB
		if (dbUser.isPresent()) {
			// check if cv file not empty
			if (!cvFile.getOriginalFilename().isEmpty()) {

				try {
					Blob blob = new SerialBlob(cvFile.getBytes());
					pdfDocument.setFilename(cvFile.getOriginalFilename());
					pdfDocument.setContent(blob);
					pdfDocument.setContentType(cvFile.getContentType());
				} catch (IOException | SQLException e) {
					e.printStackTrace();
				}

				try {
					pdfDocument.setUser(dbUser.get());
					pdfDocumentRepository.save(pdfDocument);
					dbUser.get().getPdfDocuments().add(pdfDocument);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return false;
	}

	public boolean updateUserJobCV(int userId, int jobId, int cvId) {
		boolean flag = false;
		Optional<User> dbUser = userRepository.findById(userId);
		Optional<PdfDocument> pdfDocOpt = pdfDocumentRepository.findById(cvId);
		if (dbUser.isPresent() && pdfDocOpt.isPresent()) {
			User user = dbUser.get();
			PdfDocument pdfDocument = pdfDocOpt.get();

			// get user jobs to check if the job exist in saved list
			List<Job> userJobs = new ArrayList<>();
			userJobs.addAll(user.getUserJobs());

			// loop over the saved jobs
			for (int i = 0; i < userJobs.size(); i++) {
				// if the job saved then set job received to true and update user in DB
				if (userJobs.get(i).getJobId() == jobId) {
					userJobs.get(i).setJobReceived(true);
					userJobs.get(i).setPdfDocument(pdfDocument);
					dbUser.get().setUserJobs(userJobs);

					userRepository.save(dbUser.get());
					flag = true;

					return true;
				}
			}

			// if job not exist in user saved jobs then create new row in DB and update user
			if (!flag) {
				Job newJob = jobRepository.save(new Job(jobId, true, false, pdfDocument, dbUser.get()));
				dbUser.get().getUserJobs().add(newJob);
//				dbUser.get().getPdfDocuments().add(pdfDocument);
				userRepository.save(dbUser.get());
				return true;
			}

		}
		return false;
	}

	public PdfDocument getCvDocumentById(int cvId) throws NoSuchElementException {
		// find cv by id
		PdfDocument pdf = pdfDocumentRepository.findById(cvId).orElseThrow(() -> new NoSuchElementException());
		return pdf;
	}

	public boolean deleteCV(int userId, int cvId) throws IllegalArgumentException, UserException {
		try {
			User dbUser = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found!"));
			PdfDocument pdfDocs = pdfDocumentRepository.findById(cvId)
					.orElseThrow(() -> new UserException("File not found!"));

			// remove pdf from userDocs
			dbUser.getPdfDocuments().remove(pdfDocs);
			// save user
			userRepository.save(dbUser);
			// delete pdf from table
			pdfDocumentRepository.delete(pdfDocs);

		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("CV is not exits!");
		} catch (UserException e) {
			throw new UserException("User not found!");
		}
		return true;
	}

	public boolean contactUs(ContactForm contactInfo) {
		if (!contactInfo.getFullName().isEmpty() && !contactInfo.getEmail().isEmpty()
				&& !contactInfo.getPhoneNumber().isEmpty()) {
			System.out.println(contactInfo);
			return true;
		}
		System.out.println(contactInfo);
		return false;
	}

}
