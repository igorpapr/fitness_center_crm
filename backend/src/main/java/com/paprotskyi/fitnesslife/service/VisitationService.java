package com.paprotskyi.fitnesslife.service;

import com.paprotskyi.fitnesslife.dto.VisitationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VisitationService {

    Page<VisitationDto> findByCustomerId(Integer customerId, Pageable pageable);

    VisitationDto createOne(VisitationDto dtoToCreate);

}
