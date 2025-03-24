package com.school.repository;

import com.school.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    // Find teacher by userId
    Optional<Teacher> findByUserId(Long userId);

}
