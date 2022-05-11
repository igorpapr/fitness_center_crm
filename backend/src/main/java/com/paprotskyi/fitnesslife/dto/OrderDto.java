package com.paprotskyi.fitnesslife.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    Integer id;
    @NotNull
    CustomerDto customer;
    @NotNull
    ServiceDto service;
    LocalDateTime dateStart;
    LocalDateTime dateEnd;
    Float paymentAmount;

}
