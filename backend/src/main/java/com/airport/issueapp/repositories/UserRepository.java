package com.airport.issueapp.repositories;

import com.airport.issueapp.models.User;
<<<<<<< HEAD
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
=======
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
>>>>>>> origin/master
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
