package com.newcomplaintportal.newcomplaintportal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.newcomplaintportal.newcomplaintportal.model.AdminInfo;
import com.newcomplaintportal.newcomplaintportal.model.UserInfo;
import com.newcomplaintportal.newcomplaintportal.repository.AdminRepository;
import com.newcomplaintportal.newcomplaintportal.repository.UserRepository;

@Service
public class CustomAdminServiceImplementation implements UserDetailsService {
	private AdminRepository adminRepository;
	
	

	public CustomAdminServiceImplementation(AdminRepository adminRepository) {
		super();
		this.adminRepository = adminRepository;
	}



	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AdminInfo user=adminRepository.findByEmail(username);
		if(user==null) {
			throw new UsernameNotFoundException("user not found with email"+ username);
			}
		List<GrantedAuthority>authorities=new ArrayList<>();
		return new  org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
	} 

}
