package com.newcomplaintportal.newcomplaintportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newcomplaintportal.newcomplaintportal.exception.UserException;
import com.newcomplaintportal.newcomplaintportal.model.UserComplaint;
import com.newcomplaintportal.newcomplaintportal.model.UserInfo;
import com.newcomplaintportal.newcomplaintportal.repository.UserComplaintRepository;
import com.newcomplaintportal.newcomplaintportal.request.UserComplaintRequest;
import com.newcomplaintportal.newcomplaintportal.service.UserComplaintService;
import com.newcomplaintportal.newcomplaintportal.service.UserInfoService;





@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class UserComplaintController {
	
	@Autowired
private	UserComplaintService userComplaintService;
	
	@Autowired
	private UserInfoService userInfoService;
	 
	 
	
	  @PostMapping("/create")
	   public ResponseEntity<UserComplaint>createComplaint(@RequestBody UserComplaintRequest req,@RequestHeader("Authorization")String jwt) throws UserException{
		  System.out.println("JWT Content: " + jwt);
		  UserInfo user=userInfoService.findUserProfileByJwt(jwt);
		  System.out.println(user.getEmail());
		UserComplaint complaint=userComplaintService.createComplaint(req,user);
		System.out.println("complaint"+complaint);
		return new ResponseEntity<UserComplaint>(complaint,HttpStatus.CREATED);
		
	}
	
	  @GetMapping("/user")
	  public ResponseEntity<List<UserComplaint>>usersComplaintHistory(
	  	@RequestHeader("Authorization")String jwt)throws UserException{
	  		UserInfo user=userInfoService.findUserProfileByJwt(jwt);
	  		List<UserComplaint> complaint = userComplaintService.usersComplaintHistory(user.getId());
	  		return new ResponseEntity<>(complaint,HttpStatus.CREATED);
	  	}

	  @PutMapping("/{id}/feedback")
	    public ResponseEntity<UserComplaint> updateComplaintFeedback(@PathVariable Long id,
	                                                           @RequestParam String feedback) {
	        	UserComplaint updatedComplaint = userComplaintService.updateComplaintFeedback(id, feedback);
	        return new ResponseEntity<>(updatedComplaint, HttpStatus.OK);
	    }
	     
}
