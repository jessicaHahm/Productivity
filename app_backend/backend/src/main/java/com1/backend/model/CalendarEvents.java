// needs to full the database schema to be translated here

package com1.backend.model;
//This package contains out data model classes that represent entities in the application. These classes are typically annotated with JPA annotations to define the database schema.


import jakarta.persistence.*;

@Entity
@Table(name="calendar_events")
public class CalendarEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eventId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    private String title;
    private String sDate;
    private String eDate;
    private String desc;

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String geteDate() {
        return eDate;
    }

    public void seteDate(String eDate) {
        this.eDate = eDate;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
