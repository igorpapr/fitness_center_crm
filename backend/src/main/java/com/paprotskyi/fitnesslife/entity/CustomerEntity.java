package com.paprotskyi.fitnesslife.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "customer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "first_name", nullable = false)
    String firstName;

    @Column(name = "last_name", nullable = false)
    String lastName;

    @Column(name = "date_created", nullable = false)
    LocalDateTime dateCreated;

    @Column(name = "email")
    String email;

    @OneToMany(mappedBy = "customerEntity")
    List<OrderEntity> orderEntities;

    @OneToMany(mappedBy = "customerEntity")
    List<VisitationEntity> visitations;
}
