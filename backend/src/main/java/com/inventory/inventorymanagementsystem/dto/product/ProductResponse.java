package com.inventory.inventorymanagementsystem.dto.product;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String sku;
    private String barcode;
    private String categoryName;
    private BigDecimal price;
    private String status;
    private LocalDateTime createdAt;
}
