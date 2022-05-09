package com.paprotskyi.fitnesslife.controller;

import com.paprotskyi.fitnesslife.dto.CustomerDto;
import com.paprotskyi.fitnesslife.service.CustomerService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.paprotskyi.fitnesslife.constants.ControllerConstants.CUSTOMER_BASE_PATH;

@RestController
@RequestMapping(CUSTOMER_BASE_PATH)
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CustomerController {

    CustomerService customerService;

    @GetMapping
    public ResponseEntity<Page<CustomerDto>> getCustomers(Pageable pageable) {
        return new ResponseEntity<>(customerService.findAll(pageable), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto dto) {
        return new ResponseEntity<>(customerService.createOne(dto), HttpStatus.CREATED);
    }
}
