package com1.backend.dto;

public class UpdateUsernameRequest {
    private Long userId;
    private String newUsername;

    public Long getUserId() {
        return userId;
    }

    public String getNewUsername() {
        return newUsername;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }
}
