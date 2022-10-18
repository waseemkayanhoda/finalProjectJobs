package com.jobz.Jobz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobz.Jobz.entity.Job;
import com.jobz.Jobz.entity.PdfDocument;

public interface JobRepository extends JpaRepository<Job, Integer> {

	Optional<Job> findByJobId(int jobId);

	void deleteByPdfDocument(PdfDocument pdf);

	List<Job> findByUserId(int userId);

//	Job getByJobId(int jobId);

	List<Job> getByJobId(int jobId);

}
