package com.example.eventapprovel.controller;

import com.example.eventapprovel.dto.EventIdeaRequest;
import com.example.eventapprovel.model.EventIdea;
import com.example.eventapprovel.service.EventIdeaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    private final EventIdeaService service;

    public StudentController(EventIdeaService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public EventIdea submit(@RequestBody EventIdeaRequest request) {
        return service.submitIdea(request);
    }

    @GetMapping("/ideas/{studentId}")
    public List<EventIdea> myIdeas(@PathVariable Long studentId) {
        return service.getIdeasByStudent(studentId);
    }
}

