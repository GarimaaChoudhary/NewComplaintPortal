package com.newcomplaintportal.newcomplaintportal.request;

public class UserComplaintRequest {
	
	 private String employeeCode;
	 
	 private String department;
	 
	 private String subDepartment;
	 
	 private String complaint;

	

	public String getComplaint() {
		return complaint;
	}

	public void setComplaint(String complaint) {
		this.complaint = complaint;
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
	 
}
