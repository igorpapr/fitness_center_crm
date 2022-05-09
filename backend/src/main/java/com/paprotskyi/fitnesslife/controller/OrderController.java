package com.paprotskyi.fitnesslife.controller;

import com.paprotskyi.fitnesslife.dto.OrderDto;
import com.paprotskyi.fitnesslife.service.OrderService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.paprotskyi.fitnesslife.constants.ControllerConstants.ORDER_BASE_PATH;

@RestController
@RequestMapping(ORDER_BASE_PATH)
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OrderController {

    OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderDto>> getOrders(Pageable pageable) {
        return new ResponseEntity<>(orderService.findAll(pageable), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody OrderDto dtoToCreate) {
        return new ResponseEntity<>(orderService.createOne(dtoToCreate), HttpStatus.CREATED);
    }

}
