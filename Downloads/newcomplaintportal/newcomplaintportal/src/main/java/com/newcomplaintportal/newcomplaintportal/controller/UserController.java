package com.newcomplaintportal.newcomplaintportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.newcomplaintportal.newcomplaintportal.exception.UserException;
import com.newcomplaintportal.newcomplaintportal.model.UserInfo;
import com.newcomplaintportal.newcomplaintportal.service.UserInfoService;

@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserInfoService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<UserInfo>getUserProfileHandler(@RequestHeader("Authorization")String jwt)throws UserException{
		
		UserInfo user=userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<UserInfo>(user,HttpStatus.ACCEPTED);
	}
}
