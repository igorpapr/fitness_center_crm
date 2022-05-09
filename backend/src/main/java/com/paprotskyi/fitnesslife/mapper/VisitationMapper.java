package com.paprotskyi.fitnesslife.mapper;

import com.paprotskyi.fitnesslife.dto.VisitationDto;
import com.paprotskyi.fitnesslife.entity.VisitationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {OrderMapper.class, CustomerMapper.class},
        imports = LocalDateTime.class)
public interface VisitationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateStart",
            expression = "java(dto.getDateStart() != null ? dto.getDateStart() : LocalDateTime.now())")
    VisitationEntity toCreateEntity(VisitationDto dto);

    @Mapping(target = "customerDto", source = "customerEntity")
    @Mapping(target = "orderDto", source = "orderEntity")
    VisitationDto toDto(VisitationEntity entity);

    List<VisitationDto> toDtoList(List<VisitationEntity> entities);

}
