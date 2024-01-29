package com.newcomplaintportal.newcomplaintportal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newcomplaintportal.newcomplaintportal.model.UserComplaint;

import com.newcomplaintportal.newcomplaintportal.service.UserComplaintService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class AdminController {
	
	
	 @Autowired
	    private UserComplaintService complaintService;
	
	 
	

	    @GetMapping("/view")
	    public ResponseEntity<List<UserComplaint>> getAllComplaints() {
	        List<UserComplaint> complaints = complaintService.getAllComplaints();
	        return new ResponseEntity<>(complaints, HttpStatus.OK);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<UserComplaint> getComplaintById(@PathVariable Long id) {
	        Optional<UserComplaint> complaint = complaintService.getComplaintById(id);
	        return complaint.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
	                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }

	    @PutMapping("/{id}/status")
	    public ResponseEntity<UserComplaint> updateComplaintStatus(@PathVariable Long id,
	                                                          @RequestParam String status) {
	       	UserComplaint updatedComplaint = complaintService.updateComplaintStatus(id, status);
	       return new ResponseEntity<>(updatedComplaint, HttpStatus.OK);
	    }
	    
	    @PutMapping("/{id}/adminRemark")
	    public ResponseEntity<UserComplaint> updateComplaintadminRemark(@PathVariable Long id,
	                                                          @RequestParam String adminRemark) {
	       	UserComplaint updatedComplaint = complaintService.updateComplaintadminRemark(id, adminRemark);
	       return new ResponseEntity<>(updatedComplaint, HttpStatus.OK);
	    }
}
