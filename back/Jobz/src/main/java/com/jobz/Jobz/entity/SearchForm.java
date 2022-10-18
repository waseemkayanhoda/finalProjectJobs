package com.jobz.Jobz.entity;

public class SearchForm {

	private String title;
	private String location;
	private String description;

	public SearchForm() {
		super();
	}

	public SearchForm(String title, String location, String description) {
		super();
		this.title = title;
		this.location = location;
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public String getLocation() {
		return location;
	}

	public String getDescription() {
		return description;
	}

}
