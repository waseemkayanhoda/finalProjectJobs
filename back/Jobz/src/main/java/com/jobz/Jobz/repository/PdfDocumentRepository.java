package com.jobz.Jobz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobz.Jobz.entity.PdfDocument;

public interface PdfDocumentRepository extends JpaRepository<PdfDocument, Integer> {

	void deleteByUserId(int id);

}
