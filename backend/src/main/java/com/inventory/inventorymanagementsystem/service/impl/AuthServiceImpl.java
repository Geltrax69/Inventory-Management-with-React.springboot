package com.inventory.inventorymanagementsystem.service.impl;

import com.inventory.inventorymanagementsystem.dto.auth.*;
import com.inventory.inventorymanagementsystem.entity.Role;
import com.inventory.inventorymanagementsystem.entity.User;
import com.inventory.inventorymanagementsystem.exception.BadRequestException;
import com.inventory.inventorymanagementsystem.repository.RoleRepository;
import com.inventory.inventorymanagementsystem.repository.UserRepository;
import com.inventory.inventorymanagementsystem.security.JwtUtils;
import com.inventory.inventorymanagementsystem.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String accessToken = jwtUtils.generateAccessToken(user.getUsername());
        String refreshToken = jwtUtils.generateRefreshToken(user.getUsername());
        return new AuthResponse(accessToken, refreshToken, user.getUsername(), user.getRole().getName().name());
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already in use");
        }
        Role staffRole = roleRepository.findByName(Role.RoleName.STAFF)
                .orElseThrow(() -> new BadRequestException("Default role not found. Please seed roles."));

        User user = User.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(staffRole)
                .build();
        userRepository.save(user);

        String accessToken = jwtUtils.generateAccessToken(user.getUsername());
        String refreshToken = jwtUtils.generateRefreshToken(user.getUsername());
        return new AuthResponse(accessToken, refreshToken, user.getUsername(), staffRole.getName().name());
    }

    @Override
    public AuthResponse refresh(RefreshRequest request) {
        String username = jwtUtils.getUsernameFromToken(request.getRefreshToken());
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));
        String accessToken = jwtUtils.generateAccessToken(username);
        String refreshToken = jwtUtils.generateRefreshToken(username);
        return new AuthResponse(accessToken, refreshToken, user.getUsername(), user.getRole().getName().name());
    }
}
