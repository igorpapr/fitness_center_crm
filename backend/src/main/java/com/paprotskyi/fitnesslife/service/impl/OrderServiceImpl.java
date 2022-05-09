package com.paprotskyi.fitnesslife.service.impl;

import com.paprotskyi.fitnesslife.dto.CustomerDto;
import com.paprotskyi.fitnesslife.dto.OrderDto;
import com.paprotskyi.fitnesslife.dto.ServiceDto;
import com.paprotskyi.fitnesslife.entity.CustomerEntity;
import com.paprotskyi.fitnesslife.entity.OrderEntity;
import com.paprotskyi.fitnesslife.entity.ServiceEntity;
import com.paprotskyi.fitnesslife.mapper.OrderMapper;
import com.paprotskyi.fitnesslife.repository.CustomerRepository;
import com.paprotskyi.fitnesslife.repository.OrderRepository;
import com.paprotskyi.fitnesslife.repository.ServicesRepository;
import com.paprotskyi.fitnesslife.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;

import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = PRIVATE)
@Slf4j
public class OrderServiceImpl implements OrderService {

    OrderRepository orderRepository;
    CustomerRepository customerRepository;
    ServicesRepository servicesRepository;
    OrderMapper orderMapper;

    @Override
    @Transactional
    public Page<OrderDto> findAll(Pageable pageable) {
        Page<OrderEntity> entityPage = orderRepository.findAll(pageable);
        List<OrderDto> dtos = orderMapper.toDtoList(entityPage.getContent());
        return new PageImpl<>(dtos, entityPage.getPageable(), entityPage.getTotalElements());
    }

    @Override
    @Transactional
    public OrderDto createOne(OrderDto dtoToCreate) {
        CustomerDto customerDto = dtoToCreate.getCustomerDto();
        ServiceDto serviceDto = dtoToCreate.getServiceDto();
        log.info("Customer order request with customer id: {} and service id: {}",
                customerDto.getId(), serviceDto.getId());
        CustomerEntity customerEntity = customerRepository.findById(customerDto.getId())
                .orElseThrow(() -> new NoSuchElementException(
                        String.format("Could not find customer with id: %d", customerDto.getId())));
        ServiceEntity serviceEntity = servicesRepository.findById(serviceDto.getId())
                .orElseThrow(() -> new NoSuchElementException(
                        String.format("Could not find service with id: %d", serviceDto.getId())));
        OrderEntity toCreateEntity = orderMapper.toCreateEntity(dtoToCreate);
        toCreateEntity.setCustomerEntity(customerEntity);
        toCreateEntity.setServiceEntity(serviceEntity);
        OrderEntity createdEntity = orderRepository.save(toCreateEntity);
        log.info("Created order entity with id: {}", createdEntity.getId());
        return orderMapper.toDto(createdEntity);
    }
}
