package com.paprotskyi.fitnesslife.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
