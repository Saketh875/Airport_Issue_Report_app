package com.airport.issueapp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "issues")
public class Issue {
    @Id
    private String id;
    private String category; // Renamed from sector
    private IssueStatus status;
    private IssuePriority priority;
    private String description;
    private String reporterId;
    private String assignedToId;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private LocalDateTime resolvedAt;
}
