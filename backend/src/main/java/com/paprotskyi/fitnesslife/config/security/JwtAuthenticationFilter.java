package com.paprotskyi.fitnesslife.config.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

//    private final UserDetailsService userDetailsService;

//    public JwtAuthenticationFilter(@Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
//        String jwt = getJwtFromHeaders(request);
//        String username = null;
//        if (StringUtils.hasText(jwt)) {
//            username = JwtUtils.extractUsername(jwt);
//        }
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//            //TODO get user from token and create UsernamePasswordAuthenticationToken from the given jwt, don't forget to add the FACADE
//            if (JwtUtils.validateToken(jwt, userDetails)) {
//                UsernamePasswordAuthenticationToken token =
//                        new UsernamePasswordAuthenticationToken(userDetails,
//                                null, userDetails.getAuthorities());
//                token.setDetails(
//                        new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(token);
//            }
//        }
        filterChain.doFilter(request, response);
    }

    private String getJwtFromHeaders(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}