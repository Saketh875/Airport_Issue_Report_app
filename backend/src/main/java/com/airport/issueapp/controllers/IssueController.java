package com.airport.issueapp.controllers;

import com.airport.issueapp.models.Issue;
import com.airport.issueapp.models.IssuePriority;
import com.airport.issueapp.models.IssueStatus;
import com.airport.issueapp.repositories.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    IssueRepository issueRepository;

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    @GetMapping("/my-issues")
    public List<Issue> getMyIssues(@RequestParam String reporterId) {
        return issueRepository.findByReporterId(reporterId);
    }

    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());
        if (issue.getStatus() == null) {
            issue.setStatus(IssueStatus.CREATED);
        }
        return issueRepository.save(issue);
    }

    @PostMapping("/sos")
    public Issue createSOS(@RequestBody Issue issue) {
        issue.setPriority(IssuePriority.CRITICAL);
        issue.setStatus(IssueStatus.CREATED);
        issue.setCategory("EMERGENCY");
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());
        // SOS might be anonymous or have a reporterId
        return issueRepository.save(issue);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('STAFF') or hasAuthority('ADMIN')")
    public ResponseEntity<Issue> updateStatus(@PathVariable String id, @RequestBody IssueStatus newStatus) {
        return issueRepository.findById(id)
                .map(issue -> {
                    issue.setStatus(newStatus);
                    issue.setUpdatedAt(LocalDateTime.now());
                    if (newStatus == IssueStatus.RESOLVED) {
                        issue.setResolvedAt(LocalDateTime.now());
                    }
                    return ResponseEntity.ok(issueRepository.save(issue));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
