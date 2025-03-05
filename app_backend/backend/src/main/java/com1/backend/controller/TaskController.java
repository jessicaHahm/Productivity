package com1.backend.controller;

import com1.backend.dto.CreateTaskRequest;
import com1.backend.dto.TaskDto;
import com1.backend.dto.UpdateTaskRequest;
import com1.backend.model.Task;
import com1.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getTaskByUserId(@PathVariable Long userId) {
        List<Task> taskList = taskService.getAllTasksByUserId(userId);
        if (taskList != null) {
            return ResponseEntity.ok(taskList);
        }

        return ResponseEntity.badRequest().body("Error getting all tasks with " + userId.toString());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody CreateTaskRequest createTaskRequest) {
        Task newTask = taskService.createTask(createTaskRequest);
        if (newTask != null) {
            return ResponseEntity.ok(
                    Map.of("message", "Created task successfully",
                            "userId", newTask.getUser().getUserId(),
                            "taskId", newTask.getTaskId(),
                            "title", newTask.getTitle()));
        }

        return ResponseEntity.badRequest().body("Error creating task");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTask(@RequestBody UpdateTaskRequest utr) {
        Map<String, String> response = taskService.updateTask(utr);
        if (response != null) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body("Error updating task");
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTaskById(@PathVariable Long taskId) {
        Map<String, String> response = taskService.deleteTaskById(taskId);
        if (response != null) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body("Error deleting task");
    }

    @PostMapping("/{taskId}/addCollaborator/{userId}")
    public ResponseEntity<?> addCollaboratorToTask(
            @PathVariable Long taskId,
            @PathVariable Long userId) {
        Task task = taskService.addCollaboratorToTask(taskId, userId);
        if (task != null) {
            return ResponseEntity.ok("Added collaborator to the task successfully.");
        }

        return ResponseEntity.badRequest().body("Error adding collaborator to the task.");
    }

    @DeleteMapping("/{taskId}/removeCollaborator/{userId}")
    public ResponseEntity<?> removeCollaboratorFromTask(
            @PathVariable Long taskId,
            @PathVariable Long userId) {
        Task task = taskService.removeCollaboratorFromTask(taskId, userId);
        if (task != null) {
            return ResponseEntity.ok("Removed collaborator from the task successfully.");
        }

        return ResponseEntity.badRequest().body("Error removing collaborator from the task.");
    }
@GetMapping("/all")
public List<TaskDto> getAllTasks() {
    List<Task> tasks = taskService.getAllTasks(); 
    List<TaskDto> taskDtos = tasks.stream()
            .map(task -> {
                TaskDto taskDto = new TaskDto();
                taskDto.setTaskId(task.getTaskId());
                taskDto.setTitle(task.getTitle());
                taskDto.setdDate(task.getdDate());
                taskDto.setDescription(task.getDescription());
                taskDto.setUserId(task.getUser().getUserId()); 
                return taskDto;
            })
            .collect(Collectors.toList());
    return taskDtos;
}


}
