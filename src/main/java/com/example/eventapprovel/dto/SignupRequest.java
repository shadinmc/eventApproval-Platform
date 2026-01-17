package com.example.eventapprovel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String userType; // STUDENT or TEACHER
}

