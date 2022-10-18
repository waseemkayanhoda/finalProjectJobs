package com.jobz.Jobz.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import com.jobz.Jobz.entity.ContactForm;
import com.jobz.Jobz.entity.JobObject;
import com.jobz.Jobz.entity.PdfDocument;
import com.jobz.Jobz.entity.SearchForm;
import com.jobz.Jobz.entity.User;
import com.jobz.Jobz.exception.UserException;
import com.jobz.Jobz.service.UserService;

@RestController
@RequestMapping("user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("getUser/{userId}")
	public ResponseEntity<?> getUser(@PathVariable int userId) {
		User user;
		try {
			user = userService.getUser(userId);
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (UserException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("getJobsBySearch")
	public ResponseEntity<?> getJobsBySearch(@RequestBody SearchForm searchForm) {
		List<JobObject> jobz = userService.getJobsBySearch(searchForm);
		return new ResponseEntity<>(jobz, HttpStatus.OK);
	}

	@GetMapping("getSavedJobs")
	public ResponseEntity<?> getSavedJobs(@RequestBody User user) {
		List<JobObject> jobz = userService.getSavedJobs(user);
		return new ResponseEntity<>(jobz, HttpStatus.OK);
	}

	@PutMapping("saveJob/{jobId}")
	public ResponseEntity<?> saveJob(@PathVariable(value = "jobId") int jobId, @RequestBody int userId) {
		try {
			User user = userService.saveJob(userId, jobId);
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (UserException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("getUserJobs/{userId}")
	public ResponseEntity<?> getUserJobs(@PathVariable int userId) {
		List<JobObject> userJobsList = userService.getUserJobs(userId);
		return new ResponseEntity<>(userJobsList, HttpStatus.OK);
	}

	@PostMapping(value = "uploadAndSendCV/{userId}/{jobId}")
	public ResponseEntity<?> uploadCV(@PathVariable int userId, @PathVariable int jobId,
			@ModelAttribute("document") PdfDocument pdfDocument, @RequestParam("file") MultipartFile file)
			throws MissingServletRequestPartException {
		boolean isReceived = userService.uploadAndSendCV(userId, jobId, pdfDocument, file);
		return new ResponseEntity<>(isReceived, HttpStatus.OK);
	}

	@PostMapping(value = "uploadCV/{userId}")
	public ResponseEntity<?> uploadCV(@PathVariable int userId, @ModelAttribute("document") PdfDocument pdfDocument,
			@RequestParam("file") MultipartFile file) throws MissingServletRequestPartException {
		boolean isReceived = userService.uploadCV(userId, pdfDocument, file);
		return new ResponseEntity<>(isReceived, HttpStatus.OK);
	}

	@PutMapping("updateUserJobCV/{userId}/{jobId}")
	public ResponseEntity<?> updateUserJobCV(@PathVariable int userId, @PathVariable int jobId, @RequestBody int cvId) {
		boolean isUpdated = userService.updateUserJobCV(userId, jobId, cvId);
		return new ResponseEntity<>(isUpdated, HttpStatus.OK);
	}

	@GetMapping("getCV/{cvId}")
	public ResponseEntity<?> getCvDocumentById(@PathVariable int cvId)
			throws SQLException, UnsupportedEncodingException {
		// call getCvDocument function
		PdfDocument cv = userService.getCvDocumentById(cvId);

		// generate blob from file content
		Blob myblob = cv.getContent();
		int myblobLength = (int) myblob.length();
		byte[] myblobAsBytes = myblob.getBytes(1, myblobLength);
		myblob.free();

		// convert blob to byte array
		ByteArrayInputStream bais = new ByteArrayInputStream(myblobAsBytes);

		HttpHeaders headers = new HttpHeaders();
		headers.add("File-Name", new String(cv.getFilename().getBytes(StandardCharsets.ISO_8859_1), "UTF-8"));

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
				.body(new InputStreamResource(bais));
	}

	@DeleteMapping("deleteCV/{userId}/{cvId}")
	public ResponseEntity<?> deleteCV(@PathVariable int userId, @PathVariable int cvId) {
		boolean isDeleted;
		try {
			isDeleted = userService.deleteCV(userId, cvId);
			return new ResponseEntity<>(isDeleted, HttpStatus.OK);
		} catch (IllegalArgumentException | UserException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("contact")
	public ResponseEntity<?> contactUs(@RequestBody ContactForm contactInfo) {
		boolean is = userService.contactUs(contactInfo);
		if (is) {
			return new ResponseEntity<>(is, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(is, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("getCommonWords")
	private ResponseEntity<?> getCommonWords() throws IOException {
		HashMap<String, Float> json = userService.getCommonWords();
		return new ResponseEntity<>(json, HttpStatus.OK);
	}

}
