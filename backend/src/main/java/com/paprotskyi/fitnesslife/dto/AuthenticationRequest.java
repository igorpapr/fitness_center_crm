package com.paprotskyi.fitnesslife.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {

    private String login;

    private String password;

}
