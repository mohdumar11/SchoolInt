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

    // ✅ Login endpoint
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
        Optional<User> user = studentService.login(email, password);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.status(401).build());
    }

    // ✅ Get student details by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getStudentByUserId(@PathVariable Long userId) {
        return studentService.getStudentByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get the name of the student's teacher using user ID
    @GetMapping("/user/{userId}/teacher-name")
    public ResponseEntity<String> getTeacherNameByUserId(@PathVariable Long userId) {
        String teacherName = studentService.getTeacherNameByUserId(userId);
        return ResponseEntity.ok(teacherName);
    }

    // ✅ Get students under a specific teacher using teacher's user ID
    @GetMapping("/teacher/user/{userId}/students")
    public ResponseEntity<List<Map<String, Object>>> getStudentsByTeacherUserId(@PathVariable Long userId) {
        List<Map<String, Object>> students = studentService.getStudentsByTeacherUserId(userId);
        return ResponseEntity.ok(students);
    }

    // ✅ Special case: If role is PRINCIPAL, return all students & teachers
//    @GetMapping("/principal/user/{userId}/all")
//    public ResponseEntity<Map<String, Object>> getAllUsersForPrincipal(@PathVariable Long userId) {
//        Optional<User> userOpt = studentService.getUserById(userId);
//
//        if (userOpt.isPresent() && "PRINCIPAL".equalsIgnoreCase(userOpt.get().getRole())) {
//            List<Map<String, Object>> students = studentService.getAllStudents();
//            List<Map<String, Object>> teachers = studentService.getAllTeachers();
//
//            Map<String, Object> response = Map.of(
//                    "students", students,
//                    "teachers", teachers
//            );
//
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.status(403).body(Map.of("error", "Access denied. Only PRINCIPAL can access this data."));
//        }
//    }
}
