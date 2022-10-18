package com.jobz.Jobz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobz.Jobz.entity.ResetPassword;
import com.jobz.Jobz.entity.User;
import com.jobz.Jobz.entity.UserCredentials;
import com.jobz.Jobz.exception.UserException;
import com.jobz.Jobz.service.AuthService;

@RestController
@RequestMapping("auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("createAccount")
	public ResponseEntity<?> createAccount(@RequestBody User user) {
		try {
			boolean isUserCreated = authService.createAccount(user);
			if (isUserCreated) {
				return new ResponseEntity<>(isUserCreated, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (UserException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("signin")
	public ResponseEntity<?> signin(@RequestBody UserCredentials user) {
		try {
			User userLoggedIn = authService.signin(user.getEmail(), user.getPassword());
			if (userLoggedIn != null) {
				return new ResponseEntity<>(userLoggedIn, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
			}

		} catch (UserException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("resetPassword")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPassword resetPass) {
		try {
			authService.resetPassword(resetPass);
			return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
		} catch (UserException e) {
			System.out.println(e);
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}
}
