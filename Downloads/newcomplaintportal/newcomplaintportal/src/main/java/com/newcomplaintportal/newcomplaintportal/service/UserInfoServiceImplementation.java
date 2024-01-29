package com.newcomplaintportal.newcomplaintportal.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.newcomplaintportal.newcomplaintportal.config.JwtProvider;
import com.newcomplaintportal.newcomplaintportal.exception.UserException;
import com.newcomplaintportal.newcomplaintportal.model.UserInfo;
import com.newcomplaintportal.newcomplaintportal.repository.UserRepository;

@Service
public class UserInfoServiceImplementation implements UserInfoService {

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	
	
	
	public UserInfoServiceImplementation(UserRepository userRepository,JwtProvider jwtProvider) {
		this.userRepository=userRepository;
		this.jwtProvider=jwtProvider;
	}
	@Override
	public UserInfo findUserById(Long userId) throws UserException {
		Optional<UserInfo>user=userRepository.findById(userId);
		if(user.isPresent()) {
			return user.get();
		}
		throw new UserException("user not found with is"+userId);
	}

	@Override
	public UserInfo findUserProfileByJwt(String jwt) throws UserException {
	  String email=jwtProvider.getEmailFromToken(jwt);
	  System.out.println(email);
	  
	  UserInfo user=userRepository.findByEmail(email);
	  
	  if(user==null) {
		  throw new UserException("usernot found with email"+email);
	  }
		return user;
	}
}
