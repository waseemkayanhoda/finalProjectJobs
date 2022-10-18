package com.jobz.Jobz.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.jobz.Jobz.entity.ResetPassword;
import com.jobz.Jobz.entity.User;
import com.jobz.Jobz.entity.UserRole;
import com.jobz.Jobz.exception.UserException;
import com.jobz.Jobz.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	@Value("${spring.boot.admin.user.name}")
	private String ADMIN_USERNAME;
	@Value("${spring.boot.admin.user.password}")
	private String ADMIN_PASSWORD;
	@Value("${spring.boot.admin.role}")
	private String ADMIN_ROLE;

	// Create new account
	public boolean createAccount(User user) throws UserException {
		// Check if email is registered
		Optional<User> dbUser = userRepository.findByEmail(user.getEmail());
		if (!dbUser.isPresent()) {
			user.setRole(UserRole.USER);
			// create new user
			userRepository.save(user);
			return true;
		}
		return false;
	}

	// Login
	public User signin(String email, String password) throws UserException {
		// check if admin
		if (email.toLowerCase().equals(ADMIN_USERNAME)) {
			if (password.equals(ADMIN_PASSWORD)) {
				return new User("Admin", "Admin", ADMIN_USERNAME, ADMIN_PASSWORD, "", UserRole.ADMIN);
			}
		}
		// Check if email exists
		Optional<User> dbUser = userRepository.findByEmail(email);
		if (dbUser.isPresent()) {
			// check if passwords are equal
			if (password.equals(dbUser.get().getPassword())) {
				return dbUser.get();
			} else {
				return null;
			}
		}
		return null;
	}

	public void resetPassword(ResetPassword resetPass) throws UserException {
		Optional<User> userOpt = userRepository.findByEmail(resetPass.getEmail());
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			if (user.getPassword().equals(resetPass.getOldPassword())) {
				user.setPassword(resetPass.getNewPassword());
				userRepository.save(user);
			} else {
				System.out.println("Old Password Exception");
				throw new UserException("Old Password is not correct!");
			}
		} else {
			throw new UserException("Email is invalid!");
		}
	}

}
