package com.paprotskyi.fitnesslife.entity;

import com.paprotskyi.fitnesslife.enumeration.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "login", nullable = false)
    String login;

    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "date_created", nullable = false)
    LocalDateTime dateCreated;

    @Enumerated(EnumType.STRING)
    private Role role;
}
