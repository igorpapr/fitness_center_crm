package com.paprotskyi.fitnesslife.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
@AllArgsConstructor
public class VisitationDto {

    Integer id;

    @NotNull
    CustomerDto customerDto;

    OrderDto orderDto;

    LocalDateTime dateStart;

    LocalDateTime dateEnd;

}
