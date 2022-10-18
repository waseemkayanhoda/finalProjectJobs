package com.jobz.Jobz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobz.Jobz.entity.JobObject;
import com.jobz.Jobz.entity.User;
import com.jobz.Jobz.exception.UserException;
import com.jobz.Jobz.service.AdminService;

@RestController
@RequestMapping("admin")
@CrossOrigin("*")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@GetMapping("getAllUsers")
	public ResponseEntity<?> getAllUsers() {
		List<User> usersList = adminService.getAllUsers();
		return new ResponseEntity<>(usersList, HttpStatus.OK);
	}

	@DeleteMapping("deleteUser/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable int userId) {
		try {
			boolean isDeleted = adminService.deleteUser(userId);
			return new ResponseEntity<>(isDeleted, HttpStatus.OK);
		} catch (UserException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("getAllJobs")
	public ResponseEntity<?> getAllJobs() {
		List<JobObject> jobz = adminService.getAllJobs();
		return new ResponseEntity<>(jobz, HttpStatus.OK);
	}

	@GetMapping("getUsersSentCvToJob/{jobId}")
	public ResponseEntity<?> getUsersSentCvToJob(@PathVariable int jobId) {
		List<User> users = adminService.getUsersSentCvToJob(jobId);
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

}
