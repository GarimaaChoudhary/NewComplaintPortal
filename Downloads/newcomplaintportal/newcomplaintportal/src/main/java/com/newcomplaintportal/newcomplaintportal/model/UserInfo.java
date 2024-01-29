package com.newcomplaintportal.newcomplaintportal.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class UserInfo {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private int mobile;
    
     @OneToMany(mappedBy="user",cascade=CascadeType.ALL)
	 @JsonIgnore
	 private List<UserComplaint> complaint=new ArrayList<>();
   
    
  
    
   
    
    public UserInfo()
    {}
   
	public UserInfo(Long id, String firstName, String lastName, String email, String password, int mobile,
			List<UserComplaint> complaint) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.mobile = mobile;
		this.complaint = complaint;
	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public int getMobile() {
		return mobile;
	}

	public void setMobile(int mobile) {
		this.mobile = mobile;
	}

	public List<UserComplaint> getComplaint() {
		return complaint;
	}

	public void setComplaint(List<UserComplaint> complaint) {
		this.complaint = complaint;
	}
	
	
	
	
}
