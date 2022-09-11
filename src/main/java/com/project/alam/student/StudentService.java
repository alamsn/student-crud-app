package com.project.alam.student;

import com.project.alam.student.exception.BadRequestException;
import com.project.alam.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    public void addStudent(Student student) {
        Boolean existsEmail = studentRepository
                .isEmailExist(student.getEmail());
        if (existsEmail) {
            throw new BadRequestException(
                    "Email " + student.getEmail() + " taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        if(!studentRepository.existsById(id)) {
            throw new StudentNotFoundException(
                    "Student with id " + id + " does not exist"
            );
        }
        studentRepository.deleteById(id);
    }

    public void updateStudent(Student student, Long id) {
        Student std = studentRepository.getReferenceById(id);
        std.setName(student.getName());
        std.setEmail(student.getEmail());
        std.setGender(student.getGender());
        studentRepository.save(std);
    }
}
