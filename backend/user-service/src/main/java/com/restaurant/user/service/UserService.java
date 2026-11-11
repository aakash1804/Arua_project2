package com.restaurant.user.service;

import com.restaurant.common.enums.Role;
import com.restaurant.common.exception.ResourceNotFoundException;
import com.restaurant.common.security.JwtUtils;
import com.restaurant.user.dto.AuthRequest;
import com.restaurant.user.dto.AuthResponse;
import com.restaurant.user.dto.RegisterRequest;
import com.restaurant.user.dto.UserProfileDto;
import com.restaurant.user.entity.User;
import com.restaurant.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        User user = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .role(req.getRole() != null ? req.getRole() : Role.CUSTOMER)
                .dietaryNotes(req.getDietaryNotes())
                .avatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80")
                .build();

        User saved = userRepository.save(user);
        String token = jwtUtils.generateToken(saved.getId(), saved.getEmail(), saved.getRole().name(), saved.getFullName());

        return mapToAuthResponse(saved, token);
    }

    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByEmail(req.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtUtils.generateToken(user.getId(), user.getEmail(), user.getRole().name(), user.getFullName());
        return mapToAuthResponse(user, token);
    }

    public UserProfileDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return mapToProfile(user);
    }

    @Transactional
    public UserProfileDto updateProfile(Long userId, UserProfileDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getDietaryNotes() != null) user.setDietaryNotes(dto.getDietaryNotes());

        User updated = userRepository.save(user);
        return mapToProfile(updated);
    }

    private AuthResponse mapToAuthResponse(User u, String token) {
        return AuthResponse.builder()
                .token(token)
                .id(u.getId())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .role(u.getRole())
                .phone(u.getPhone())
                .avatar(u.getAvatar())
                .build();
    }

    private UserProfileDto mapToProfile(User u) {
        return UserProfileDto.builder()
                .id(u.getId())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .phone(u.getPhone())
                .role(u.getRole())
                .dietaryNotes(u.getDietaryNotes())
                .avatar(u.getAvatar())
                .build();
    }
}

