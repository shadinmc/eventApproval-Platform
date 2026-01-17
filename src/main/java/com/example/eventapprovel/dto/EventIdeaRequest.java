package com.example.eventapprovel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventIdeaRequest {
    private String title;
    private String description;
    private Long studentId;

}
