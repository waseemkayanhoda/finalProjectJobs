package com.jobz.Jobz.entity;

public class ResetPassword {

	private String email;
	private String oldPassword;
	private String newPassword;

	public ResetPassword() {
		super();
	}

	public ResetPassword(String email, String oldPassword, String newPassword) {
		super();
		this.email = email;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}

	public String getEmail() {
		return email;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

}
