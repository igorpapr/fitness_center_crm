package com.paprotskyi.fitnesslife.service;

import com.paprotskyi.fitnesslife.dto.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    Page<OrderDto> findAllByService(Integer serviceId, Pageable pageable);

    Page<OrderDto> findAllByCustomer(Integer customerId, Pageable pageable);

    OrderDto createOne(OrderDto dtoToCreate);

}
