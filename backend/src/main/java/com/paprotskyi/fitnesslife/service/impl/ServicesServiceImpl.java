package com.paprotskyi.fitnesslife.service.impl;

import com.paprotskyi.fitnesslife.dto.ServiceDto;
import com.paprotskyi.fitnesslife.entity.ServiceEntity;
import com.paprotskyi.fitnesslife.mapper.ServicesMapper;
import com.paprotskyi.fitnesslife.repository.ServicesRepository;
import com.paprotskyi.fitnesslife.service.ServicesService;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = PRIVATE)
@Slf4j
public class ServicesServiceImpl implements ServicesService {

    ServicesRepository servicesRepository;
    ServicesMapper servicesMapper;

    @Override
    public Page<ServiceDto> findAll(Pageable pageable) {
        Page<ServiceEntity> entityPage = servicesRepository.findAll(pageable);
        List<ServiceDto> dtos = servicesMapper.toDtoList(entityPage.getContent());
        return new PageImpl<>(dtos, entityPage.getPageable(), entityPage.getTotalElements());
    }

    @Override
    public ServiceDto createOne(ServiceDto serviceDtoToCreate) {
        log.info("Service create request with title: {}", serviceDtoToCreate.getTitle());
        ServiceEntity toCreateEntity = servicesMapper.toEntity(serviceDtoToCreate);
        ServiceEntity createdEntity = servicesRepository.save(toCreateEntity);
        log.info("Created service entity with id: {}", createdEntity.getId());
        return servicesMapper.toDto(createdEntity);
    }

    @Override
    public ServiceDto update(ServiceDto toUpdate, Integer serviceId) {
        log.info("Service update request for id: {}", serviceId);
        ServiceEntity
        return null;
    }
}
