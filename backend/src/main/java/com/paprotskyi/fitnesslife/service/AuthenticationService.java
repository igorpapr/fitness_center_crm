package com.paprotskyi.fitnesslife.service;

import com.paprotskyi.fitnesslife.dto.AuthenticationRequest;

public interface AuthenticationService {

    String authenticateAndCreateJwt(AuthenticationRequest request);

}
