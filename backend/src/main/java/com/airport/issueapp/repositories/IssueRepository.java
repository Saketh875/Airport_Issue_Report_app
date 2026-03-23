package com.airport.issueapp.repositories;

import com.airport.issueapp.models.Issue;
import com.airport.issueapp.models.IssueStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByCategory(String category);

    List<Issue> findByStatus(IssueStatus status);

    List<Issue> findByReporterId(Long reporterId);

    List<Issue> findByAssignedToId(Long assignedToId);
}
