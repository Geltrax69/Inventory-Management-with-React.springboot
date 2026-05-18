package com.inventory.inventorymanagementsystem.service;

import com.inventory.inventorymanagementsystem.dto.auth.AuthResponse;
import com.inventory.inventorymanagementsystem.dto.auth.LoginRequest;
import com.inventory.inventorymanagementsystem.dto.auth.RefreshRequest;
import com.inventory.inventorymanagementsystem.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
    AuthResponse refresh(RefreshRequest request);
}
