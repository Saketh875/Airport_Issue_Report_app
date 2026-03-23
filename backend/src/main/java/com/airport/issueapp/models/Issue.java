package com.airport.issueapp.models;

<<<<<<< HEAD
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
=======
import jakarta.persistence.*;
>>>>>>> origin/master
import lombok.Data;
import java.time.LocalDateTime;

@Data
<<<<<<< HEAD
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
=======
@Entity
@Table(name = "issues")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String category;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueStatus status;
    
    @Enumerated(EnumType.STRING)
    private IssuePriority priority;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Long reporterId;
    private Long assignedToId;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    private LocalDateTime resolvedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void setStatus(IssueStatus newStatus) {
        this.status = newStatus;
    }
>>>>>>> origin/master
}
