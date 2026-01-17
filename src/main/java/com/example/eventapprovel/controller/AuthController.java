package com.example.eventapprovel.controller;

import com.example.eventapprovel.dto.SignupRequest;
import com.example.eventapprovel.model.User;
import com.example.eventapprovel.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody SignupRequest request) {
        return service.signup(request);
    }
}

