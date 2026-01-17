package com.example.eventapprovel.service;


import com.example.eventapprovel.dto.EventIdeaRequest;
import com.example.eventapprovel.model.*;
import com.example.eventapprovel.repository.EventIdeaRepository;
import com.example.eventapprovel.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventIdeaService {

    private final EventIdeaRepository eventRepo;
    private final UserRepository userRepo;

    public EventIdeaService(EventIdeaRepository eventRepo, UserRepository userRepo) {
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
    }

    public EventIdea submitIdea(EventIdeaRequest request) {
        User student = userRepo.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        EventIdea idea = new EventIdea();
        idea.setTitle(request.getTitle());
        idea.setDescription(request.getDescription());
        idea.setStudent(student);
        idea.setStatus(EventStatus.SUBMITTED);

        return eventRepo.save(idea);
    }

    public List<EventIdea> getIdeasForHod() {
        return eventRepo.findByStatus(EventStatus.SUBMITTED);
    }

    public List<EventIdea> getIdeasForPrincipal() {
        return eventRepo.findByStatus(EventStatus.HOD_APPROVED);
    }

    public EventIdea hodApprove(Long id, String comment) {
        EventIdea idea = getIdea(id);
        idea.setStatus(EventStatus.HOD_APPROVED);
        idea.setHodComment(comment);
        return eventRepo.save(idea);
    }

    public EventIdea hodReject(Long id, String comment) {
        EventIdea idea = getIdea(id);
        idea.setStatus(EventStatus.HOD_REJECTED);
        idea.setHodComment(comment);
        return eventRepo.save(idea);
    }

    public EventIdea hodClarify(Long id, String comment) {
        EventIdea idea = getIdea(id);
        idea.setStatus(EventStatus.HOD_NEED_CLARIFICATION);
        idea.setHodComment(comment);
        return eventRepo.save(idea);
    }

    public EventIdea principalApprove(Long id, String comment) {
        EventIdea idea = getIdea(id);
        if (idea.getStatus() != EventStatus.HOD_APPROVED) {
            throw new RuntimeException("HOD approval required");
        }
        idea.setStatus(EventStatus.PRINCIPAL_APPROVED);
        idea.setPrincipalComment(comment);
        return eventRepo.save(idea);
    }

    public EventIdea principalReject(Long id, String comment) {
        EventIdea idea = getIdea(id);
        idea.setStatus(EventStatus.PRINCIPAL_REJECTED);
        idea.setPrincipalComment(comment);
        return eventRepo.save(idea);
    }

    private EventIdea getIdea(Long id) {
        return eventRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public List<EventIdea> getIdeasByStudent(Long studentId) {
        return eventRepo.findByStudentId(studentId);
    }
}
