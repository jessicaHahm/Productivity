package com1.backend.service;

import com1.backend.dto.CreateTaskRequest;
import com1.backend.dto.UpdateTaskRequest;
import com1.backend.model.Collaborators;
import com1.backend.model.Task;
import com1.backend.repository.TaskRepository;
import com1.backend.repository.UserRepository;
import com1.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

//  format all dates to be in the form "YYYY-MM-DD hh:mm:ss"

    public List<Task> getAllTasksByUserId(Long id) {
        User user = userService.getUserById(id);
        return taskRepository.findAllByUser(user);
    }

    public Task createTask(CreateTaskRequest createTaskRequest) {

        User user = userService.getUserById(createTaskRequest.getUserId());

        if (user != null) {
            Task newTask = new Task();

            newTask.setUser(user);
            newTask.setTitle(createTaskRequest.getTitle());
            newTask.setDescription(createTaskRequest.getDescription());
            newTask.setdDate(createTaskRequest.getdDate());

            return taskRepository.save(newTask);
        }
        else {
            throw new IllegalArgumentException("User not found for the given ID.");
        }
    }

//  this requires that in the JSON request, you include ALL fields shown below.
    public Map<String, String> updateTask(UpdateTaskRequest utr) {
        if (taskRepository.existsById(utr.getTaskId())) {
            Task task = taskRepository.findByTaskId(utr.getTaskId());

            task.setTitle(utr.getTitle());
            task.setDescription(utr.getDescription());
            task.setdDate(utr.getdDate());
            taskRepository.save(task);

            Map<String, String> response = Map.of(
                    "message", "Updated the current task with taskId " + task.getTaskId().toString(),
                    "taskId", task.getTaskId().toString(),
                    "title", task.getTitle(),
                    "description", task.getDescription(),
                    "dDate", task.getdDate());

            return response;
        }

        return null;
    }

    public Map<String, String> deleteTaskById(Long id) {
        if (taskRepository.existsById(id)) {
            Map<String, String> response = Map.of(
                    "message",
                    "Deleted the following task successfully",
                    "taskId",
                    id.toString());
            taskRepository.deleteById(id);
            return response;
        }

        return null;
    }
    public Task addCollaboratorToTask(Long taskId, Long userId) {
        Task task = taskRepository.findByTaskId(taskId);
        User user = userRepository.findByUserId(userId);

        if (task != null && user != null) {
            Collaborators collaborator = new Collaborators();
            collaborator.setTask(task);
            collaborator.setUser(user);

            task.getCollaborators().add(collaborator);

            taskRepository.save(task);
            return task;
        }

        return null;
    }

    public Task removeCollaboratorFromTask(Long taskId, Long userId) {
        Task task = taskRepository.findByTaskId(taskId);

        if (task != null) {
            task.getCollaborators().removeIf(collaborator -> collaborator.getUser().getUserId().equals(userId));

            taskRepository.save(task);
            return task;
        }

        return null;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll(); 
    }
}
