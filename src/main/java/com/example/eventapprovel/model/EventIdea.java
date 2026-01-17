package com.example.eventapprovel.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class EventIdea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @Enumerated(EnumType.STRING)
    private EventStatus status;

    private String hodComment;
    private String principalComment;

}
