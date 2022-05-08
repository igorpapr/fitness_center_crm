package com.paprotskyi.fitnesslife.controller;

import com.paprotskyi.fitnesslife.dto.ServiceDto;
import com.paprotskyi.fitnesslife.service.ServicesService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.paprotskyi.fitnesslife.constants.ControllerConstants.SERVICE_BASE_PATH;

@RestController
@RequestMapping(SERVICE_BASE_PATH)
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ServiceController {

    ServicesService servicesService;

    @GetMapping
    public ResponseEntity<Page<ServiceDto>> getServicesList(Pageable pageable) {
        return new ResponseEntity<>(servicesService.findAll(pageable), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ServiceDto> createService(
            @RequestBody ServiceDto serviceDtoToCreate) {
        return new ResponseEntity<>(servicesService.createOne(serviceDtoToCreate), HttpStatus.CREATED);
    }

    @PutMapping("/{serviceId}")
    public ResponseEntity<ServiceDto> updateService(@RequestBody ServiceDto toUpdate,
                                                    @PathVariable Integer serviceId) {
        return new ResponseEntity<>(servicesService.update(toUpdate, serviceId), HttpStatus.OK);
    }

}
