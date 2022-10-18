package com.jobz.Jobz.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "job")
public class Job {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;

	@Column(name = "job_id")
	private int jobId;

	@Column(name = "job_received")
	private boolean jobReceived;

	@Column(name = "saved_job")
	private boolean savedJob;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private PdfDocument pdfDocument;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private User user;

	public Job() {
		super();
	}

	public Job(int jobId, boolean jobReceived, boolean savedJob, PdfDocument pdfDocument, User user) {
		super();
		this.jobId = jobId;
		this.jobReceived = jobReceived;
		this.savedJob = savedJob;
		this.pdfDocument = pdfDocument;
		this.user = user;
	}

	public boolean isJobReceived() {
		return jobReceived;
	}

	public void setJobReceived(boolean jobsReceived) {
		this.jobReceived = jobsReceived;
	}

	public boolean isSavedJob() {
		return savedJob;
	}

	public void setSavedJob(boolean savedJobs) {
		this.savedJob = savedJobs;
	}

	public int getId() {
		return Id;
	}

	public int getJobId() {
		return jobId;
	}

	public PdfDocument getPdfDocument() {
		return pdfDocument;
	}

	public void setPdfDocument(PdfDocument pdfDocument) {
		this.pdfDocument = pdfDocument;
	}

	public User getUser() {
		return user;
	}

	@Override
	public String toString() {
		return "Job [Id=" + Id + ", jobId=" + jobId + ", jobReceived=" + jobReceived + ", savedJob=" + savedJob
				+ ", pdfDocument=" + pdfDocument + ", user=" + user + "]";
	}

}
