package com.paprotskyi.fitnesslife.service.impl;

import com.paprotskyi.fitnesslife.dto.CustomerDto;
import com.paprotskyi.fitnesslife.entity.CustomerEntity;
import com.paprotskyi.fitnesslife.mapper.CustomerMapper;
import com.paprotskyi.fitnesslife.repository.CustomerRepository;
import com.paprotskyi.fitnesslife.service.CustomerService;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = PRIVATE)
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    CustomerRepository customerRepository;
    CustomerMapper customerMapper;

    @Override
    public Page<CustomerDto> findAll(Pageable pageable) {
        Page<CustomerEntity> entityPage = customerRepository.findAll(pageable);
        List<CustomerDto> dtos = customerMapper.toDtoList(entityPage.getContent());
        return new PageImpl<>(dtos, entityPage.getPageable(), entityPage.getTotalElements());
    }

    @Override
    @Transactional
    public CustomerDto createOne(CustomerDto dtoToCreate) {
        log.info("Customer create request with firstName: {} and lastName: {}",
                dtoToCreate.getFirstName(), dtoToCreate.getLastName());
        CustomerEntity toCreateEntity = customerMapper.toEntity(dtoToCreate);
        CustomerEntity createdEntity = customerRepository.save(toCreateEntity);
        log.info("Created Customer entity with id: {}", createdEntity.getId());
        return customerMapper.toDto(createdEntity);
    }
}
