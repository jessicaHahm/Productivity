package com1.backend.dto;

import com1.backend.model.User;

public class CreateTaskRequest {
    //  format all dates to be in the form "YYYY-MM-DD hh:mm:ss"
    private Long userId;
    private String title;
    private String description;
    private String dDate;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getdDate() {
        return dDate;
    }

    public void setdDate(String dDate) {
        this.dDate = dDate;
    }
}
