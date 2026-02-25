package com.example.eventapprovel.controller;

import com.example.eventapprovel.model.EventIdea;
import com.example.eventapprovel.service.EventIdeaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hod")
public class HodController {

    private final EventIdeaService service;

    public HodController(EventIdeaService service) {
        this.service = service;
    }

    @GetMapping("/ideas")
    public List<EventIdea> ideas() {
        return service.getIdeasForHod();
    }

    @PutMapping("/{id}/approve")
    public EventIdea approve(@PathVariable Long id, @RequestBody String comment) {
        return service.hodApprove(id, comment);
    }

    @PutMapping("/{id}/reject")
    public EventIdea reject(@PathVariable Long id, @RequestBody String comment) {
        return service.hodReject(id, comment);
    }

    @PutMapping("/{id}/clarify")
    public EventIdea clarify(@PathVariable Long id, @RequestBody String comment) {
        return service.hodClarify(id, comment);
    }
}

