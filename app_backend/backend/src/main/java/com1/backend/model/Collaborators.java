// needs to full the database schema to be translated here

package com1.backend.model;
//This package contains out data model classes that represent entities in the application. These classes are typically annotated with JPA annotations to define the database schema.


import jakarta.persistence.*;

@Entity
@Table(name = "collaborators")
public class Collaborators {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long collaboratorId;

    @ManyToOne(fetch = FetchType.LAZY, cascade=CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade=CascadeType.REMOVE)
    @JoinColumn(name = "task_id", referencedColumnName = "user_id")
    private Task task;

    public Long getCollaboratorId() {
        return collaboratorId;
    }

    public void setCollaboratorId(Long collaboratorId) {
        this.collaboratorId = collaboratorId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
