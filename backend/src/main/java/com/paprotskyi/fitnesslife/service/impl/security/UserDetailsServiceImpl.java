package com.paprotskyi.fitnesslife.service.impl.security;

import com.paprotskyi.fitnesslife.entity.UserEntity;
import com.paprotskyi.fitnesslife.entity.security.UserDetailsImpl;
import com.paprotskyi.fitnesslife.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> userOptional = userRepository.findByLogin(email);
        userOptional.orElseThrow(() -> new UsernameNotFoundException(
                String.format("The user with login: %s was not found", email)));
        return userOptional.map(UserDetailsImpl::new).get();
    }
}