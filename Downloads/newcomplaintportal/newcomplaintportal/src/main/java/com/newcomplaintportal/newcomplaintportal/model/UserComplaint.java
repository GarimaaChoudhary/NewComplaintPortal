package com.newcomplaintportal.newcomplaintportal.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class UserComplaint {
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private Long id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserInfo user;
	 
	 
	 
	 private String employeeCode;
	 
	 private String department;
	 
	 private String subDepartment;
	 
	 private LocalDateTime complaintDate;
	 
	 private String complaint;
	 
	



	private String status;
	 
	 private String adminRemark;
	 
	 private String feedback;
	 
	
	
	public UserComplaint()
	{}



	public UserComplaint(Long id, UserInfo user, String employeeCode, String department, String subDepartment,
			LocalDateTime complaintDate,String complaint, String status, String adminRemark, String feedback) {
		super();
		this.id = id;
		this.user = user;
		this.employeeCode = employeeCode;
		this.department = department;
		this.subDepartment = subDepartment;
		this.complaintDate = complaintDate;
		this.complaint=complaint;
		this.status = status;
		this.adminRemark = adminRemark;
		this.feedback = feedback;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public UserInfo getUser() {
		return user;
	}



	public void setUser(UserInfo user) {
		this.user = user;
	}



	public String getEmployeeCode() {
		return employeeCode;
	}



	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}



	public String getDepartment() {
		return department;
	}



	public void setDepartment(String department) {
		this.department = department;
	}



	public String getSubDepartment() {
		return subDepartment;
	}



	public void setSubDepartment(String subDepartment) {
		this.subDepartment = subDepartment;
	}



	public LocalDateTime getComplaintDate() {
		return complaintDate;
	}



	public void setComplaintDate(LocalDateTime complaintDate) {
		this.complaintDate = complaintDate;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public String getAdminRemark() {
		return adminRemark;
	}
	 public String getComplaint() {
			return complaint;
		}



		public void setComplaint(String complaint) {
			this.complaint = complaint;
		}



	public void setAdminRemark(String adminRemark) {
		this.adminRemark = adminRemark;
	}



	public String getFeedback() {
		return feedback;
	}



	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
	
	 
	 

}
