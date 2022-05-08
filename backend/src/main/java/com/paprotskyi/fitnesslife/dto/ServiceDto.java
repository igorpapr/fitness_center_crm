package com.paprotskyi.fitnesslife.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode(of = {"id", "title"})
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {

    Integer id;

    String title;

    LocalDateTime dateCreated;

    Boolean active;

    String description;

    Float price;

}
