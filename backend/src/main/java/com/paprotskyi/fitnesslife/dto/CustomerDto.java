package com.paprotskyi.fitnesslife.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = {"id", "firstName", "lastName"})
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

    Integer id;
    String firstName;
    String lastName;
    LocalDateTime dateCreated;
    String email;

}
