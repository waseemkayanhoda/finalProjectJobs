package com.jobz.Jobz.entity;

import com.opencsv.bean.CsvBindByName;

public class JobObject {

	@CsvBindByName(column = "No.")
	private int id;

	@CsvBindByName(column = "Job_title")
	private String jobTitle;

	@CsvBindByName(column = "Salary")
	private String salary;

	@CsvBindByName(column = "Location")
	private String location;

	@CsvBindByName(column = "Contract_type")
	private String contractType;

	@CsvBindByName(column = "job_description")
	private String jobDescription;

	@CsvBindByName(column = "Type_Of_Company")
	private String companyType;

	@CsvBindByName(column = "Job_Type")
	private String jobType;

	public int getId() {
		return id;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public String getSalary() {
		return salary;
	}

	public String getLocation() {
		return location;
	}

	public String getContractType() {
		return contractType;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public String getCompanyType() {
		return companyType;
	}

	public String getJobType() {
		return jobType;
	}

	@Override
	public String toString() {
		return "JobObject [id=" + id + ", jobTitle=" + jobTitle + "]";
	}

}
