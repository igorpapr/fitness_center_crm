package com.paprotskyi.fitnesslife.mapper;

import com.paprotskyi.fitnesslife.dto.OrderDto;
import com.paprotskyi.fitnesslife.entity.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {ServicesMapper.class, CustomerMapper.class},
        imports = LocalDateTime.class)
public interface OrderMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateStart",
            expression = "java(dto.getDateStart() != null ? dto.getDateStart() : LocalDateTime.now())")
    OrderEntity toCreateEntity(OrderDto dto);

    @Mapping(target = "customer", source = "customerEntity")
    @Mapping(target = "service", source = "serviceEntity")
    OrderDto toDto(OrderEntity entity);

    List<OrderDto> toDtoList(List<OrderEntity> entities);
}
