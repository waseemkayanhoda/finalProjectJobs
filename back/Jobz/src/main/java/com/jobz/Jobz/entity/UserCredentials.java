package com.jobz.Jobz.entity;

public class UserCredentials {

	private String email;

	private String password;

	public UserCredentials(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

}
