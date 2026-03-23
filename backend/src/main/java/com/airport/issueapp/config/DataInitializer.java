package com.airport.issueapp.config;

import com.airport.issueapp.models.Role;
import com.airport.issueapp.models.User;
import com.airport.issueapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed Admin
        if (!userRepository.existsByEmail("admin@airport.com")) {
            User admin = new User();
            admin.setFullName("Admin User");
            admin.setEmail("admin@airport.com");
            admin.setPassword(passwordEncoder.encode("password123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Seeded Admin User");
        }

        // Seed Staff
        if (!userRepository.existsByEmail("staff@airport.com")) {
            User staff = new User();
            staff.setFullName("Staff User");
            staff.setEmail("staff@airport.com");
            staff.setPassword(passwordEncoder.encode("password123"));
            staff.setRole(Role.STAFF);
            userRepository.save(staff);
            System.out.println("Seeded Staff User");
        }

        // Seed Passenger
        if (!userRepository.existsByEmail("user@airport.com")) {
            User passenger = new User();
            passenger.setFullName("Passenger User");
            passenger.setEmail("user@airport.com");
            passenger.setPassword(passwordEncoder.encode("password123"));
            passenger.setRole(Role.PASSENGER);
            userRepository.save(passenger);
            System.out.println("Seeded Passenger User");
        }
    }
}
