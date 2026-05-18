package com.inventory.inventorymanagementsystem.repository;

import com.inventory.inventorymanagementsystem.entity.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
    List<InventoryTransaction> findTop20ByOrderByDateDesc();
}
