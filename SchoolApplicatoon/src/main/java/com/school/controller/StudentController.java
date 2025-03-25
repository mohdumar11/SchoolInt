package com.school.controller;

import com.school.model.User;
import com.school.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    //  Login endpoint
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
        Optional<User> user = studentService.login(email, password);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.status(401).build());
    }

    //  Get student details by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getStudentByUserId(@PathVariable Long userId) {
        return studentService.getStudentByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //  Get the name of the student's teacher using user ID
    @GetMapping("/user/{userId}/teacher-name")
    public ResponseEntity<String> getTeacherNameByUserId(@PathVariable Long userId) {
        String teacherName = studentService.getTeacherNameByUserId(userId);
        return ResponseEntity.ok(teacherName);
    }

    //  Get students under a specific teacher using teacher's user ID
    @GetMapping("/teacher/user/{userId}/students")
    public ResponseEntity<List<Map<String, Object>>> getStudentsByTeacherUserId(@PathVariable Long userId) {
        List<Map<String, Object>> students = studentService.getStudentsByTeacherUserId(userId);
        return ResponseEntity.ok(students);
    }

    //  Get all students and teachers if the role is PRINCIPAL
    @GetMapping("/all-users/{userId}")
    public ResponseEntity<Map<String, Object>> getAllUsersForPrincipal(@PathVariable Long userId) {
        try {
            Map<String, Object> response = studentService.getAllStudentsAndTeachersForPrincipal(userId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        }
    }

}
