package com.newcomplaintportal.newcomplaintportal.service;

import java.util.List;
import java.util.Optional;

import com.newcomplaintportal.newcomplaintportal.model.UserComplaint;
import com.newcomplaintportal.newcomplaintportal.model.UserInfo;
import com.newcomplaintportal.newcomplaintportal.request.UserComplaintRequest;



public interface UserComplaintService {

	public UserComplaint createComplaint(UserComplaintRequest req,UserInfo user) ;

	public Optional<UserComplaint> getComplaintById(Long id);

	public List<UserComplaint> getAllComplaints();

	public UserComplaint updateComplaintStatus(Long id, String status);
	
	public List<UserComplaint> usersComplaintHistory(Long userId);
	
	public UserComplaint updateComplaintFeedback(Long id, String feedback);

	public UserComplaint updateComplaintadminRemark(Long id, String adminRemark);

}
