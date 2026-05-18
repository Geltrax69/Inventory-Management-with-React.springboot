package com.inventory.inventorymanagementsystem.service;

import com.inventory.inventorymanagementsystem.dto.product.ProductRequest;
import com.inventory.inventorymanagementsystem.dto.product.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse createProduct(ProductRequest request);
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(Long id);
    ProductResponse updateProduct(Long id, ProductRequest request);
}
