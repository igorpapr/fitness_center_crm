//package com.paprotskyi.fitnesslife.service.impl.security;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service("userDetailsServiceImpl")
//public class UserDetailsServiceImpl implements UserDetailsService {
//
////    private final UserRepository userRepository;
////
////    public UserDetailsServiceImpl(UserRepository userRepository) {
////        this.userRepository = userRepository;
////    }
////
////    @Override
////    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
////        Optional<User> userOptional = userRepository.findByEmail(email);
////        userOptional.orElseThrow(() -> new UsernameNotFoundException(
////                String.format("The user with email: %s was not found", email)));
////        return userOptional.map(UserDetailsImpl::new).get();
////    }
//
//    // this below is not used
//
////    @Override
////    public UserDetails loadUserByUsername(final String userlogin)
////            throws UsernameNotFoundException {
////        com.meetup.entities.User userInfo = userDAO.findUserByLogin(userlogin);
////        List<GrantedAuthority> authorities = new ArrayList<>();
////        for (Role role : userInfo.getRoles()) {
////            GrantedAuthority a = new SimpleGrantedAuthority(role.name());
////            authorities.add(a);
////        }
////
////        return new User(userInfo.getLogin(),
////                userInfo.getPassword(),
////                authorities);
////
////    }
//}