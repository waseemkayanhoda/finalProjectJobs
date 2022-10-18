package com.jobz.Jobz.service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobz.Jobz.entity.Job;
import com.jobz.Jobz.entity.JobObject;
import com.jobz.Jobz.entity.PdfDocument;
import com.jobz.Jobz.entity.User;
import com.jobz.Jobz.exception.UserException;
import com.jobz.Jobz.repository.JobRepository;
import com.jobz.Jobz.repository.PdfDocumentRepository;
import com.jobz.Jobz.repository.UserRepository;
import com.opencsv.bean.CsvToBeanBuilder;

@Service
public class AdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PdfDocumentRepository pdfDocumentRepository;

	@Autowired
	private JobRepository jobRepository;

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUserById(int userId) throws UserException {
		User user;
		try {
			user = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found!"));
			return user;
		} catch (UserException e) {
			throw new UserException("User not found!");
		}
	}

	public boolean deleteUser(int userId) throws UserException {
		try {
			User user = getUserById(userId);
			if (user != null) {

				if (!user.getUserJobs().isEmpty() || !user.getPdfDocuments().isEmpty()) {

					List<Job> userJobs = user.getUserJobs();
					List<PdfDocument> userPdf = user.getPdfDocuments();

					userJobs.stream().forEach(job -> {
						jobRepository.delete(job);
					});

					userPdf.stream().forEach(pdf -> {
						pdfDocumentRepository.delete(pdf);
					});

				}
				try {
					userRepository.delete(user);
				} catch (IllegalArgumentException e) {
					System.out.println(e.getMessage());
				}
				return true;
			} else {
				return false;
			}
		} catch (UserException e) {
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

	public List<User> getUsersSentCvToJob(int jobId) {
		List<Job> jobs = jobRepository.getByJobId(jobId);
		System.out.println(jobs);
		List<User> users = new ArrayList<>();
		jobs.forEach(job -> {
			users.add(job.getUser());
		});
		System.out.println(users);
		return users;
	}

}
