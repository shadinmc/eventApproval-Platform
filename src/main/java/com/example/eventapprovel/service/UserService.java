package com.example.eventapprovel.service;


import com.example.eventapprovel.dto.SignupRequest;
import com.example.eventapprovel.model.Role;
import com.example.eventapprovel.model.User;
import com.example.eventapprovel.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User signup(SignupRequest request) {

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // plain for demo

        if ("TEACHER".equalsIgnoreCase(request.getUserType())) {
            user.setRole(Role.HOD);
        } else {
            user.setRole(Role.STUDENT);
        }

        return repository.save(user);
    }
}
