package com.paprotskyi.fitnesslife.repository;

import com.paprotskyi.fitnesslife.entity.VisitationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitationRepository extends JpaRepository<VisitationEntity, Integer> {

    Page<VisitationEntity> findAllByCustomerEntityIdOrderByDateStart(Integer customerId, Pageable pageable);

}
