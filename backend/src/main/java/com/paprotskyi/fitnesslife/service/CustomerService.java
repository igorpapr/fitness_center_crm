package com.paprotskyi.fitnesslife.service;

import com.paprotskyi.fitnesslife.dto.CustomerDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerService {

    Page<CustomerDto> findAll(Pageable pageable);

    CustomerDto createOne(CustomerDto dtoToCreate);
}
