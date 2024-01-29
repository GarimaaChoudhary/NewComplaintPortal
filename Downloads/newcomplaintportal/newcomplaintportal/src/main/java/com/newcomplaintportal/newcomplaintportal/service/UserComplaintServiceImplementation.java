package com.newcomplaintportal.newcomplaintportal.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newcomplaintportal.newcomplaintportal.model.UserComplaint;
import com.newcomplaintportal.newcomplaintportal.model.UserInfo;
import com.newcomplaintportal.newcomplaintportal.repository.UserComplaintRepository;
import com.newcomplaintportal.newcomplaintportal.request.UserComplaintRequest;



@Service
public class UserComplaintServiceImplementation implements UserComplaintService {

	@Autowired
	private UserComplaintRepository userComplaintRepository;
	
	@Override
	public UserComplaint createComplaint(UserComplaintRequest req,UserInfo user) {
		UserComplaint complaint=new UserComplaint();
		
		
		//complaint.setComplaintDate(LocalDateTime.now());
		complaint.setUser(user);
	    complaint.setEmployeeCode(req.getEmployeeCode());
	    complaint.setDepartment(req.getDepartment());
	    complaint.setSubDepartment(req.getSubDepartment());
	    complaint.setComplaint(req.getComplaint());
	 
	    complaint.setComplaintDate(LocalDateTime.now());
	    complaint.setStatus("PENDING");
	    complaint.setAdminRemark("");
		
		complaint.setFeedback("");
		
		
	
	   return userComplaintRepository.save(complaint);
		
	}
	@Override
	public Optional<UserComplaint> getComplaintById(Long id) {
		// TODO Auto-generated method stub
		   return userComplaintRepository.findById(id);
	}
	@Override
	public List<UserComplaint> getAllComplaints() {
		  
		        return userComplaintRepository.findAll();
		    

	
	}
	@Override
	public UserComplaint updateComplaintStatus(Long id, String status) {
		UserComplaint complaint = userComplaintRepository.findById(id).orElseThrow();

   complaint.setStatus(status);
  return userComplaintRepository.save(complaint);

	}
	@Override
	public List<UserComplaint> usersComplaintHistory(Long userId) {
		List<UserComplaint> complaints=userComplaintRepository.getUsersComplaints(userId);
		return complaints;

	}
	@Override
	public UserComplaint updateComplaintFeedback(Long id, String feedback) {
		UserComplaint complaint = userComplaintRepository.findById(id).orElseThrow();

		   complaint.setFeedback(feedback);
		  return userComplaintRepository.save(complaint);
	}
	@Override
	public UserComplaint updateComplaintadminRemark(Long id, String adminRemark) {
		UserComplaint complaint = userComplaintRepository.findById(id).orElseThrow();

		   complaint.setAdminRemark(adminRemark);
		  return userComplaintRepository.save(complaint);
		
	}

}
