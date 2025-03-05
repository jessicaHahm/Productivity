package com1.backend.service;
//This package contains service classes that encapsulate the business logic of our application.
import com1.backend.dto.LoginRequest;
import com1.backend.dto.UpdatePasswordRequest;
import com1.backend.dto.UpdateUsernameRequest;
import com1.backend.dto.SignupRequest;
import com1.backend.model.User;
import com1.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUser(Long id) {
        return userRepository.findByUserId(id);
    }

    public User signUpUser(SignupRequest signupRequest) {
        // Check if the email already exists in the database
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return null; // User registration failed
        }

        User newUser = new User();
        newUser.setUsername(signupRequest.getUsername());
        newUser.setEmail(signupRequest.getEmail());
        newUser.setPassword(signupRequest.getPassword()); // You should hash/salt the password here

        // Save the new user to the database
        return userRepository.save(newUser);
    }

    public User loginUser(LoginRequest loginRequest) {
        // Find the user by email and password
        return userRepository.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
    }

    public User getUserById(Long id) {
        return userRepository.findByUserId(id);
    }

    public User updateUsername(UpdateUsernameRequest uur) {
        User currUser = userRepository.findByUserId(uur.getUserId());
        if (currUser != null) {
            currUser.setUsername(uur.getNewUsername());
            return userRepository.save(currUser);
        }

        return null;
    }

    public User updatePassword(UpdatePasswordRequest pcr) {
        User currUser = userRepository.findByEmailAndPassword(pcr.getEmail(), pcr.getPassword());
        if (currUser != null) {
            currUser.setPassword(pcr.getNewPassword());
            return userRepository.save(currUser);
        }

        return null;
    }

    public Map<String, String> deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            Map<String, String> response = Map.of(
                    "message",
                    "Deleted the following user successfully",
                    "userId",
                    id.toString());
            userRepository.deleteById(id);
            return response;
        }

        return null;
    }
}
