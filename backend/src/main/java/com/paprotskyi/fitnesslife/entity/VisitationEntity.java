package com.paprotskyi.fitnesslife.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "visitation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VisitationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    CustomerEntity customerEntity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    OrderEntity orderEntity;

    @Column(name = "date_start", nullable = false)
    LocalDateTime dateStart;

    @Column(name = "date_end")
    LocalDateTime dateEnd;

}
