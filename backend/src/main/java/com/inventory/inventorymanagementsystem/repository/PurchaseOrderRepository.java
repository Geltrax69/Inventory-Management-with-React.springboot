package com.inventory.inventorymanagementsystem.repository;

import com.inventory.inventorymanagementsystem.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
}
