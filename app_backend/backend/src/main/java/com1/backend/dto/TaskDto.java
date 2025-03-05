package com1.backend.dto;

public class TaskDto {
 private Long taskId;
    private String title;
    private String sDate;
    private String dDate;
    private String status;
    private String description;
    private Long userId; // Include the user_id in the DTO

    // Constructors

    public TaskDto() {

    }

    public TaskDto(Long taskId, String title, String sDate, String dDate, String status, String description, Long userId) {
        this.taskId = taskId;
        this.title = title;
        this.sDate = sDate;
        this.dDate = dDate;
        this.status = status;
        this.description = description;
        this.userId = userId;
    }

    // Getters and setters

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getsDate() {
        return sDate;
    }

    public void setsDate(String sDate) {
        this.sDate = sDate;
    }

    public String getdDate() {
        return dDate;
    }

    public void setdDate(String dDate) {
        this.dDate = dDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}