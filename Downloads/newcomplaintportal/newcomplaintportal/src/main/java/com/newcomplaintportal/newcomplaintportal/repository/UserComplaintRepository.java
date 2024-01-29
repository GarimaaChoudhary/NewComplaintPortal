package com.newcomplaintportal.newcomplaintportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.newcomplaintportal.newcomplaintportal.model.UserComplaint;






public interface UserComplaintRepository extends JpaRepository<UserComplaint, Long> {
    @Query("SELECT c FROM UserComplaint c WHERE c.user.id = :userId")
    public List<UserComplaint> getUsersComplaints(@Param("userId") Long userId);
}
