package com.paprotskyi.fitnesslife.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "service")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "title", nullable = false)
    String title;

    @Column(name = "date_created", nullable = false)
    LocalDateTime dateCreated;

    @Column(name = "active", nullable = false)
    Boolean active;

    @Column(name = "description")
    String description;

    @Column(name = "price")
    Float price;

    @OneToMany(mappedBy = "customerEntity")
    List<OrderEntity> orderEntities;
}
