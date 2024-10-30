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

  public void addOrUpdateStudent(String username, String rawPassword) {
    SystemUser student = new SystemUser();
    student.setUsername(username);
    student.setPassword(passwordEncoder.encode(rawPassword));
    student.setRoles(Set.of("STUDENT"));
    systemUserRepository.save(student);
  }

  public void deleteStudent(String username) {
    systemUserRepository.findByUsername(username)
        .ifPresent(systemUserRepository::delete);
  }

  public Set<String> getStudentNameList() {
    Set<SystemUser> students = systemUserRepository.findByRole("STUDENT");
    return students.stream()
        .map(SystemUser::getUsername)
        .collect(Collectors.toSet());
  }
}
