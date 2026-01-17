package com.example.eventapprovel.controller;

import com.example.eventapprovel.model.EventIdea;
import com.example.eventapprovel.service.EventIdeaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/principal")
@CrossOrigin
public class PrincipalController {

    private final EventIdeaService service;

    public PrincipalController(EventIdeaService service) {
        this.service = service;
    }

    @GetMapping("/ideas")
    public List<EventIdea> ideas() {
        return service.getIdeasForPrincipal();
    }

    @PutMapping("/{id}/approve")
    public EventIdea approve(@PathVariable Long id, @RequestBody String comment) {
        return service.principalApprove(id, comment);
    }

    @PutMapping("/{id}/reject")
    public EventIdea reject(@PathVariable Long id, @RequestBody String comment) {
        return service.principalReject(id, comment);
    }
}

