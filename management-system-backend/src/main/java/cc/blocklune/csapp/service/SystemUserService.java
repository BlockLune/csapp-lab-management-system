package cc.blocklune.csapp.service;

import cc.blocklune.csapp.model.SystemUser;
import cc.blocklune.csapp.repository.SystemUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SystemUserService {
  private final SystemUserRepository systemUserRepository;
  private final PasswordEncoder passwordEncoder;

  public SystemUserService(SystemUserRepository systemUserRepository, PasswordEncoder passwordEncoder) {
    this.systemUserRepository = systemUserRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public boolean isTeacher(String username) {
    return systemUserRepository.findRolesByUsername(username)
        .map(roles -> roles.contains("teacher"))
        .orElse(false);
  }

  public boolean isStudent(String username) {
    return systemUserRepository.findRolesByUsername(username)
        .map(roles -> roles.contains("student"))
        .orElse(false);
  }

  public void addStudent(String studentId, String rawPassword) {
    SystemUser student = new SystemUser();
    student.setUsername(studentId);
    student.setPassword(passwordEncoder.encode(rawPassword));
    student.setRoles(Set.of("STUDENT"));
    systemUserRepository.save(student);
  }

  public void updateStudent(String studentId, String rawPassword) {
    SystemUser student = systemUserRepository.findByUsername(studentId)
        .orElseThrow(() -> new IllegalArgumentException("Student not found"));
    if (rawPassword == null) {
      return;
    }
    if (!student.getRoles().contains("STUDENT")) {
      throw new IllegalArgumentException("Cannot find a student with the given ID");
    }
    student.setPassword(passwordEncoder.encode(rawPassword));
    systemUserRepository.save(student);
  }

  public void deleteStudent(String studentId) {
    systemUserRepository.findByUsername(studentId)
        .ifPresent(systemUserRepository::delete);
  }

  public Set<String> getStudentNameList() {
    Set<SystemUser> students = systemUserRepository.findByRole("STUDENT");
    return students.stream()
        .map(SystemUser::getUsername)
        .collect(Collectors.toSet());
  }
}
