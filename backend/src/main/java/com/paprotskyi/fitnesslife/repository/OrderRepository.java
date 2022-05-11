package com.paprotskyi.fitnesslife.repository;

import com.paprotskyi.fitnesslife.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    Page<OrderEntity> findAllByServiceEntityId(Integer serviceId, Pageable pageable);

    Page<OrderEntity> findAllByCustomerEntityId(Integer customerId, Pageable pageable);
}
