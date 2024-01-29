package com.newcomplaintportal.newcomplaintportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newcomplaintportal.newcomplaintportal.model.UserInfo;



public interface UserRepository extends JpaRepository<UserInfo,Long> {
	public UserInfo findByEmail(String email);

}
