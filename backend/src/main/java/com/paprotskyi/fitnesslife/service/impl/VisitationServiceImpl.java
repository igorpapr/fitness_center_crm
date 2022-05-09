package com.paprotskyi.fitnesslife.service.impl;

import com.paprotskyi.fitnesslife.dto.CustomerDto;
import com.paprotskyi.fitnesslife.dto.OrderDto;
import com.paprotskyi.fitnesslife.dto.VisitationDto;
import com.paprotskyi.fitnesslife.entity.CustomerEntity;
import com.paprotskyi.fitnesslife.entity.OrderEntity;
import com.paprotskyi.fitnesslife.entity.VisitationEntity;
import com.paprotskyi.fitnesslife.mapper.VisitationMapper;
import com.paprotskyi.fitnesslife.repository.CustomerRepository;
import com.paprotskyi.fitnesslife.repository.OrderRepository;
import com.paprotskyi.fitnesslife.repository.VisitationRepository;
import com.paprotskyi.fitnesslife.service.VisitationService;
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
public class VisitationServiceImpl implements VisitationService {

    VisitationRepository visitationRepository;
    VisitationMapper visitationMapper;
    CustomerRepository customerRepository;
    OrderRepository orderRepository;

    @Override
    public Page<VisitationDto> findByCustomerId(Integer customerId, Pageable pageable) {
        Page<VisitationEntity> entityPage =
                visitationRepository.findAllByCustomerEntityIdOrderByDateStart(customerId, pageable);
        List<VisitationDto> dtos = visitationMapper.toDtoList(entityPage.getContent());
        return new PageImpl<>(dtos, entityPage.getPageable(), entityPage.getTotalElements());
    }

    @Override
    @Transactional
    public VisitationDto createOne(VisitationDto dtoToCreate) {
        CustomerDto customerDto = dtoToCreate.getCustomerDto();
        OrderDto orderDto = dtoToCreate.getOrderDto();
        OrderEntity orderEntity = null;
        if (orderDto != null) {
            log.info("Visitation request with customer id: {} and order id: {}",
                    customerDto.getId(), orderDto.getId());
            orderEntity = orderRepository.findById(orderDto.getId())
                    .orElseThrow(() -> new NoSuchElementException(
                            String.format("Could not find order with id: %d", orderDto.getId())));
        } else {
            log.info("Visitation request with customer id: {}", customerDto.getId());
        }
        CustomerEntity customerEntity = customerRepository.findById(customerDto.getId())
                .orElseThrow(() -> new NoSuchElementException(
                        String.format("Could not find customer with id: %d", customerDto.getId())));

        VisitationEntity toCreateEntity = visitationMapper.toCreateEntity(dtoToCreate);
        toCreateEntity.setCustomerEntity(customerEntity);
        toCreateEntity.setOrderEntity(orderEntity);
        VisitationEntity createdEntity = visitationRepository.save(toCreateEntity);
        log.info("Created visitation entity with id: {}", createdEntity.getId());
        return visitationMapper.toDto(createdEntity);
    }
}
