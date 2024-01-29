package com.newcomplaintportal.newcomplaintportal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newcomplaintportal.newcomplaintportal.config.JwtProvider;
import com.newcomplaintportal.newcomplaintportal.exception.UserException;
import com.newcomplaintportal.newcomplaintportal.model.AdminInfo;

import com.newcomplaintportal.newcomplaintportal.repository.AdminRepository;

import com.newcomplaintportal.newcomplaintportal.request.LoginRequest;
import com.newcomplaintportal.newcomplaintportal.response.AuthResponse;
import com.newcomplaintportal.newcomplaintportal.service.CustomAdminServiceImplementation;


@RestController
@RequestMapping("/auth")
public class AdminAuthController {
	private AdminRepository adminRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private CustomAdminServiceImplementation customerAdminService;

	

	
	
	public AdminAuthController(AdminRepository adminRepository, JwtProvider jwtProvider,
			PasswordEncoder passwordEncoder, CustomAdminServiceImplementation customerAdminService) {
		super();
		this.adminRepository = adminRepository;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
		this.customerAdminService = customerAdminService;
	}
	@PostMapping("/admin/signup")
	public ResponseEntity<AuthResponse>createAdminHandler(@RequestBody AdminInfo admin)throws UserException{
		String email=admin.getEmail();
		String password=admin.getPassword();
		String employeeCode=admin.getEmployeecode();
		
		
		AdminInfo isEmailExist=adminRepository.findByEmail(email);
		if(isEmailExist!=null) {
			throw new UserException("Email is already used with another account");
		}
		
		AdminInfo createdAdmin=new AdminInfo();
		createdAdmin.setEmail(email);
		createdAdmin.setPassword(passwordEncoder.encode(password));
		createdAdmin.setEmployeecode(employeeCode);
		
		
		AdminInfo savedAdmin=adminRepository.save(createdAdmin);
		
		
		Authentication authentication=new UsernamePasswordAuthenticationToken(savedAdmin.getEmail(),savedAdmin.getPassword());
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	
	    String token=jwtProvider.generateToken(authentication);
	    AuthResponse authResponse=new AuthResponse();
	    authResponse.setJwt(token);
	    authResponse.setMessage("Signup success");
	    
	    return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
	}
     @PostMapping("/admin/signin")
    public ResponseEntity<AuthResponse>loginAdminHandler(@RequestBody LoginRequest loginRequest){
    	String username=loginRequest.getEmail();
    	String password=loginRequest.getPassword();
    	Authentication authentication=authenticate(username,password);
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	
    	 String token=jwtProvider.generateToken(authentication);
  	    AuthResponse authResponse=new AuthResponse();
  	     authResponse.setJwt(token);
	     authResponse.setMessage("Signin success");
  	    
  	    return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
    	}

	private Authentication authenticate(String username, String password) {
	    UserDetails userDetails=customerAdminService.loadUserByUsername(username);
	    
	    if(userDetails==null) {
	    	throw new BadCredentialsException("Invalid username");
	    }
	    
	    if(!passwordEncoder.matches(password,userDetails.getPassword())) {
	    	throw new BadCredentialsException("Invalid Password");
	    }
	    return  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
		
	}
}
