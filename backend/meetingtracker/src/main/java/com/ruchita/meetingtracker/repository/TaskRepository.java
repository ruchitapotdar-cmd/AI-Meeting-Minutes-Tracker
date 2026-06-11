package com.ruchita.meetingtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ruchita.meetingtracker.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}