package com.newcomplaintportal.newcomplaintportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AdminInfo {
	

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
	private String email;
    private String password;
    private String employeecode;
    
    public AdminInfo() {
    	
    }
	public AdminInfo(Long id, String email, String password, String employeecode) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.employeecode = employeecode;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmployeecode() {
		return employeecode;
	}
	public void setEmployeecode(String employeecode) {
		this.employeecode = employeecode;
	}
    
    
}
