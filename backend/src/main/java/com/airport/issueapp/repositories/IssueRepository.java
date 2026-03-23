package com.airport.issueapp.repositories;

import com.airport.issueapp.models.Issue;
import com.airport.issueapp.models.IssueStatus;
<<<<<<< HEAD
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IssueRepository extends MongoRepository<Issue, String> {
=======
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
>>>>>>> origin/master
    List<Issue> findByCategory(String category);

    List<Issue> findByStatus(IssueStatus status);

<<<<<<< HEAD
    List<Issue> findByReporterId(String reporterId);

    List<Issue> findByAssignedToId(String assignedToId);
=======
    List<Issue> findByReporterId(Long reporterId);

    List<Issue> findByAssignedToId(Long assignedToId);
>>>>>>> origin/master
}
