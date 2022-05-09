package com.paprotskyi.fitnesslife.controller;

import com.paprotskyi.fitnesslife.dto.VisitationDto;
import com.paprotskyi.fitnesslife.service.VisitationService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import static com.paprotskyi.fitnesslife.constants.ControllerConstants.VISITATION_BASE_PATH;

@RestController
@RequestMapping(VISITATION_BASE_PATH)
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class VisitationController {

    VisitationService visitationService;

    @GetMapping
    public ResponseEntity<Page<VisitationDto>> getVisitationsByCustomerId(@NotNull @RequestParam Integer customerId,
                                                                          Pageable pageable) {
        return new ResponseEntity<>(visitationService.findByCustomerId(customerId, pageable), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VisitationDto> createOrder(@Valid @RequestBody VisitationDto dtoToCreate) {
        return new ResponseEntity<>(visitationService.createOne(dtoToCreate), HttpStatus.CREATED);
    }

}
