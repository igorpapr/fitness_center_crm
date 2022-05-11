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

    @GetMapping("/by_service")
    public ResponseEntity<Page<OrderDto>> getOrdersByService(@RequestParam Integer serviceId,
                                                             Pageable pageable) {
        return new ResponseEntity<>(orderService.findAllByService(serviceId, pageable), HttpStatus.OK);
    }

    //yes, I know that REST API is not created in that way, I'm just doing this asap
    @GetMapping("/by_customer")
    public ResponseEntity<Page<OrderDto>> getOrdersByCustomer(@RequestParam Integer customerId,
                                                             Pageable pageable) {
        return new ResponseEntity<>(orderService.findAllByCustomer(customerId, pageable), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody OrderDto dtoToCreate) {
        return new ResponseEntity<>(orderService.createOne(dtoToCreate), HttpStatus.CREATED);
    }

}
