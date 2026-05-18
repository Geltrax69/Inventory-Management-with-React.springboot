package com.inventory.inventorymanagementsystem.dto.inventory;

import com.inventory.inventorymanagementsystem.entity.InventoryTransaction.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TransactionRequest {
    @NotNull
    private Long productId;
    @NotNull
    private Long warehouseId;
    @NotNull
    private TransactionType type;
    @NotNull @Positive
    private Integer quantity;
}
