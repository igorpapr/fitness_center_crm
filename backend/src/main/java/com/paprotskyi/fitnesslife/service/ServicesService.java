package com.paprotskyi.fitnesslife.service;

import com.paprotskyi.fitnesslife.dto.ServiceDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ServicesService {

    Page<ServiceDto> findAll(Pageable pageable);

    ServiceDto createOne(ServiceDto serviceDtoToCreate);

    ServiceDto update(ServiceDto toUpdate);
}
