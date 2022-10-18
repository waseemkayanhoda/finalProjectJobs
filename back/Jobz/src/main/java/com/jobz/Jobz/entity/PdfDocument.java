package com.jobz.Jobz.entity;

import java.sql.Blob;
import java.sql.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "pdf_documents")
public class PdfDocument {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;

	@Column(name = "name")
	private String name;

	@Column(name = "filename")
	private String filename;

	@Column(name = "content")
	@Lob
	private Blob content;

	@Column(name = "content_type")
	private String contentType;

	@Column(name = "created")
	private Date created;

	@JsonIgnore
	@OneToMany(mappedBy = "pdfDocument")
	private Set<Job> job;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	public PdfDocument() {
		super();
	}

	public PdfDocument(String name, String filename, Blob content, String contentType, Date created) {
		super();
		this.name = name;
		this.filename = filename;
		this.content = content;
		this.contentType = contentType;
		this.created = created;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public Blob getContent() {
		return content;
	}

	public void setContent(Blob content) {
		this.content = content;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getId() {
		return Id;
	}

	public Set<Job> getJob() {
		return job;
	}

	public void setJob(Set<Job> job) {
		this.job = job;
	}

	@Override
	public String toString() {
		return "PdfDocument [Id=" + Id + ", filename=" + filename + "]";
	}

}
