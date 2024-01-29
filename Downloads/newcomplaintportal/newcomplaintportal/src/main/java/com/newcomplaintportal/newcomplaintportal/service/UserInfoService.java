package com.newcomplaintportal.newcomplaintportal.service;

import com.newcomplaintportal.newcomplaintportal.exception.UserException;
import com.newcomplaintportal.newcomplaintportal.model.UserInfo;

public interface UserInfoService {

public UserInfo findUserById(Long userId)throws UserException;
	
	public UserInfo findUserProfileByJwt(String jwt)throws UserException;
}
