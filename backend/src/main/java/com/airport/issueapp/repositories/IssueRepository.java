package com.airport.issueapp.repositories;

import com.airport.issueapp.models.Issue;
import com.airport.issueapp.models.IssueStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IssueRepository extends MongoRepository<Issue, String> {
    List<Issue> findByCategory(String category);

    List<Issue> findByStatus(IssueStatus status);

    List<Issue> findByReporterId(String reporterId);

    List<Issue> findByAssignedToId(String assignedToId);
}
