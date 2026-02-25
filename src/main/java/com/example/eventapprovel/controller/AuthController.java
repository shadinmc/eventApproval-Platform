package com.example.eventapprovel.controller;

import com.example.eventapprovel.dto.LoginRequest;
import com.example.eventapprovel.dto.LoginResponse;
import com.example.eventapprovel.dto.SignupRequest;
import com.example.eventapprovel.model.User;
import com.example.eventapprovel.repository.UserRepository;
import com.example.eventapprovel.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService service;
    private UserRepository userRepository;

    public AuthController(UserService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody SignupRequest request) {
        return service.signup(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmailAndPassword(
                        request.getEmail(),
                        request.getPassword()
                )
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        LoginResponse response = new LoginResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());

        return response;
    }


}

