package com1.backend.dto;
//This package is Data Transfer Object (DTO) classes that represent the structure of data transferred between our controllers and clients.
public class LoginRequest {
    private String username;
    private String password;

    // Getter methods
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // Setter methods
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
