package com.paprotskyi.fitnesslife.service;

import com.paprotskyi.fitnesslife.dto.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    Page<OrderDto> findAll(Pageable pageable);

    OrderDto createOne(OrderDto dtoToCreate);

}
