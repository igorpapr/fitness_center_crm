package com.paprotskyi.fitnesslife.mapper;

import com.paprotskyi.fitnesslife.dto.CustomerDto;
import com.paprotskyi.fitnesslife.entity.CustomerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        imports = LocalDateTime.class)
public interface CustomerMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateCreated",
            expression = "java(dto.getDateCreated() != null ? dto.getDateCreated() : LocalDateTime.now())")
    CustomerEntity toEntity(CustomerDto dto);

    CustomerDto toDto(CustomerEntity entity);

    List<CustomerDto> toDtoList(List<CustomerEntity> entities);

}
