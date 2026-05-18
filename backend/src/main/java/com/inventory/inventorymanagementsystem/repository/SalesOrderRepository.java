package com.inventory.inventorymanagementsystem.repository;

import com.inventory.inventorymanagementsystem.entity.SalesOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesOrderRepository extends JpaRepository<SalesOrder, Long> {
}
