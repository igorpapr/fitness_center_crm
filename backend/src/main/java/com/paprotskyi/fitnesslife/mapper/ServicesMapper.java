package com.paprotskyi.fitnesslife.mapper;

import com.paprotskyi.fitnesslife.dto.ServiceDto;
import com.paprotskyi.fitnesslife.entity.ServiceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, imports = LocalDateTime.class)
public interface ServicesMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateCreated",
            expression = "java(dto.getDateCreated() != null ? dto.getDateCreated() : LocalDateTime.now())")
    @Mapping(target = "active", constant = "true")
    ServiceEntity toEntity(ServiceDto dto);

    ServiceDto toDto(ServiceEntity entity);

    List<ServiceDto> toDtoList(List<ServiceEntity> entities);

}
