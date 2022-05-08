package com.paprotskyi.fitnesslife.repository;

import com.paprotskyi.fitnesslife.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicesRepository extends JpaRepository<ServiceEntity, Integer> {
}
