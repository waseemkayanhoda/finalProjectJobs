package com.jobz.Jobz.entity;

public class ContactForm {

	private String fullName;
	private String email;
	private String phoneNumber;

	public ContactForm() {
		super();
	}

	public ContactForm(String fullName, String email, String phoneNumber) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}

	public String getFullName() {
		return fullName;
	}

	public String getEmail() {
		return email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	@Override
	public String toString() {
		return "ContactForm [fullName=" + fullName + ", email=" + email + ", phoneNumber=" + phoneNumber + "]";
	}

}
