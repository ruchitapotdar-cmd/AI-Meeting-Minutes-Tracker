package com.ruchita.meetingtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ruchita.meetingtracker.entity.Task;
import com.ruchita.meetingtracker.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }
    
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
    
    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id).orElse(null);

        if (task != null) {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());

            return taskRepository.save(task);
        }

        return null;
    }
}