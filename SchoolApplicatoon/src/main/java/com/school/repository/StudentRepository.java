package com.school.repository;

import com.school.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Fetch student by user ID
    Optional<Student> findByUserId(Long userId);

    // Fetch students by teacher's user ID
    List<Student> findByTeacherUserId(Long userId);
}