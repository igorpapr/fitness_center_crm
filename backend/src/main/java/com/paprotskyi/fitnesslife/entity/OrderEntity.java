package com.paprotskyi.fitnesslife.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "order")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    CustomerEntity customerEntity;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    ServiceEntity serviceEntity;

    @Column(name = "date_start", nullable = false)
    LocalDateTime dateStart;

    @Column(name = "date_end", nullable = false)
    LocalDateTime dateEnd;

    @Column(name = "payment_amount", nullable = false)
    Float paymentAmount;
}
