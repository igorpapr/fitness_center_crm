package com.paprotskyi.fitnesslife.service.impl.security;

import com.paprotskyi.fitnesslife.dto.AuthenticationRequest;
import com.paprotskyi.fitnesslife.entity.security.UserDetailsImpl;
import com.paprotskyi.fitnesslife.service.AuthenticationService;
import com.paprotskyi.fitnesslife.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    public AuthenticationServiceImpl(AuthenticationManager authenticationManager,
                                     @Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public String authenticateAndCreateJwt(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getLogin());
        return JwtUtils.generateJWTToken((UserDetailsImpl) userDetails);
    }
}