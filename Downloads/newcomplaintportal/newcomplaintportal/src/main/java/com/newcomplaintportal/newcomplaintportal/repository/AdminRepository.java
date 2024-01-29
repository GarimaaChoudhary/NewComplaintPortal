package com.newcomplaintportal.newcomplaintportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newcomplaintportal.newcomplaintportal.model.AdminInfo;


public interface AdminRepository extends JpaRepository<AdminInfo,Long> {
	public AdminInfo findByEmail(String email);

}
