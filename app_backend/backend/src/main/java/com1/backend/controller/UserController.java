package com1.backend.controller;
// This package contains out RESTful controllers, which define the API endpoints and handle HTTP requests.

import com1.backend.dto.LoginRequest;
import com1.backend.dto.UpdatePasswordRequest;
import com1.backend.dto.UpdateUsernameRequest;
import com1.backend.dto.SignupRequest;
import com1.backend.model.User;
import com1.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.badRequest().body("Error getting user");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignupRequest signupRequest) {
        User newUser = userService.signUpUser(signupRequest);
        if (newUser != null) {
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", newUser.getUserId()));

        } else {
            return ResponseEntity.badRequest().body("Error with user registration");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest);
        if (user != null) {
            return ResponseEntity.ok(Map.of(
                "message", "User logged in successfully", 
                "userId", user.getUserId()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PutMapping("/update-username")
    public ResponseEntity<?> updateUsername(@RequestBody UpdateUsernameRequest uur) {
        User user = userService.updateUsername(uur);
        if (user != null) {
            return ResponseEntity.ok("Username updated successfully");
        }
        else {
            return ResponseEntity.badRequest().body("Error updating username");
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest upr) {
        User user = userService.updatePassword(upr);
        if (user != null) {
            return ResponseEntity.ok("Password updated successfully");
        }
        else {
            return ResponseEntity.badRequest().body("Error updating password");
        }
    }

   @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        Map<String, String> response = userService.deleteUserById(id);
        if (response != null) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body("Error deleting user");
    }
}
