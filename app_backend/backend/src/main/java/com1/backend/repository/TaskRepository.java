package com1.backend.repository;

import com1.backend.model.Task;
import com1.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUser(User user);
    Task findByTaskId(Long id);
    
    @Query("SELECT t FROM Task t JOIN FETCH t.user")
    List<Task> findAllTasksWithUser();

}
