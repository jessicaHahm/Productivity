// needs to full the database schema to be translated here

package com1.backend.model;
//This package contains out data model classes that represent entities in the application. These classes are typically annotated with JPA annotations to define the database schema.
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "task_id")
    private Long taskId;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    private String title;
    private String description;
    // Format dates with the SQL format YYYY-MM-DD HH:MI:SS
    private String dDate;

    // @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    // private Set<Collaborators> collaborators;

    // public Set<Collaborators> getCollaborators() {
    //     return collaborators;
    // }

    // public void setCollaborators(Set<Collaborators> collaborators) {
    //     this.collaborators = collaborators;
    // }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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