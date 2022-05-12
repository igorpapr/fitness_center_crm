package com.paprotskyi.fitnesslife.controller;

import com.paprotskyi.fitnesslife.constants.ControllerConstants;
import com.paprotskyi.fitnesslife.dto.AuthenticationRequest;
import com.paprotskyi.fitnesslife.entity.security.AuthenticationResponse;
import com.paprotskyi.fitnesslife.service.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.paprotskyi.fitnesslife.constants.ControllerConstants.CHILD_AUTH_PATH;

@RestController
@RequestMapping(ControllerConstants.AUTH_PATH)
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(CHILD_AUTH_PATH)
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest credentials) {
        log.info("Incoming authentication request: " + credentials.toString());
        AuthenticationResponse response =
                new AuthenticationResponse(authenticationService.authenticateAndCreateJwt(credentials));
        return ResponseEntity.ok(response);
    }
}
