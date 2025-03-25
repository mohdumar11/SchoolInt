package com.school.service;

import com.school.model.Student;
import com.school.model.User;
import com.school.repository.StudentRepository;
import com.school.repository.TeacherRepository;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //  Login method
    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (password.equals(user.getPassword())) { // Consider using passwordEncoder.matches()
                return userOpt;
            } else {
                System.out.println("Incorrect Password!");
            }
        }
        return Optional.empty();
    }

    //  Get student details by userId
    public Optional<Map<String, Object>> getStudentByUserId(Long userId) {
        return studentRepository.findByUserId(userId).map(student -> {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", student.getUser().getId());
            response.put("name", student.getName());
            response.put("studentId",student.getId());
            return response;
        });
    }

    //  Get the teacher's name using student userId
    public String getTeacherNameByUserId(Long userId) {
        Optional<Student> student = studentRepository.findByUserId(userId);
        return student.map(s -> {
            if (s.getTeacher() != null) {
                return s.getTeacher().getName();
            } else {
                return "No teacher assigned";
            }
        }).orElse("Student not found");
    }

    //  Get all students under a specific teacher using teacher's userId
    public List<Map<String, Object>> getStudentsByTeacherUserId(Long userId) {
        return studentRepository.findByTeacherUserId(userId).stream().map(student -> {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", student.getUser().getId());
            response.put("name", student.getName());
            response.put("email", student.getUser().getEmail());
            response.put("teacherUserId", student.getTeacher().getUser().getId());
            response.put("teacherName", student.getTeacher().getName());
            return response;
        }).toList();
    }

    //  Get all teachers (for Principal role)
    public List<Map<String, Object>> getAllTeachers() {
        return teacherRepository.findAll().stream().map(teacher -> {
            Map<String, Object> response = new HashMap<>();
            response.put("teacherId", teacher.getId());
            response.put("name", teacher.getName());
            response.put("email", teacher.getUser().getEmail());
            response.put("userId", teacher.getUser().getId());
            return response;
        }).toList();
    }

    //  Get all students (for Principal role)
    public List<Map<String, Object>> getAllStudents() {
        return studentRepository.findAll().stream().map(student -> {
            Map<String, Object> response = new HashMap<>();
            response.put("studentId", student.getId());
            response.put("name", student.getName());
            response.put("email", student.getUser().getEmail());
            response.put("userId", student.getUser().getId());
            return response;
        }).toList();
    }

    //  Get all students and teachers if user is Principal
    public Map<String, Object> getAllStudentsAndTeachersForPrincipal(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent() && "PRINCIPAL".equals(userOpt.get().getRole())) {
            Map<String, Object> response = new HashMap<>();
            response.put("students", getAllStudents());
            response.put("teachers", getAllTeachers());
            return response;
        } else {
            throw new RuntimeException("Access denied! Only principals can access this data.");
        }
    }
}
