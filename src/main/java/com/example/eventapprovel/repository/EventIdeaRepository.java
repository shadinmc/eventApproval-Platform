package com.example.eventapprovel.repository;


import com.example.eventapprovel.model.EventIdea;
import com.example.eventapprovel.model.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventIdeaRepository extends JpaRepository<EventIdea, Long> {
    List<EventIdea> findByStatus(EventStatus status);
    List<EventIdea> findByStudentId(Long studentId);

}
