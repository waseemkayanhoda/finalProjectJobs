package com.jobz.Jobz.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobz.Jobz.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByEmail(String email);

	
}
