package cc.blocklune.csapp.repository;

import cc.blocklune.csapp.model.LabInfo;
import cc.blocklune.csapp.model.SystemUser;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

  @Autowired
  private SystemUserRepository userRepository;
  @Autowired
  private LabInfoRepository labInfoRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    if (userRepository.count() == 0) {
      SystemUser teacher = new SystemUser();
      teacher.setUsername("the-teacher");
      teacher.setPassword(passwordEncoder.encode("the-teacher-password"));
      teacher.setRoles(Set.of("TEACHER"));
      userRepository.save(teacher);

      for (int i = 0; i < 10; ++i) {
        SystemUser student = new SystemUser();
        student.setUsername("student-" + i);
        student.setPassword(passwordEncoder.encode("student-" + i + "-password"));
        student.setRoles(Set.of("STUDENT"));
        userRepository.save(student);
      }
    }

    if (labInfoRepository.count() == 0) {
      LabInfo lab1 = new LabInfo();
      lab1.setName("Data Lab");
      lab1.setDescription(
          "Students implement simple logical, two's complement, and floating point functions, but using a highly restricted subset of C. For example, they might be asked to compute the absolute value of a number using only bit-level operations and straightline code. This lab helps students understand the bit-level representations of C data types and the bit-level behavior of the operations on data.");
      labInfoRepository.save(lab1);

      LabInfo lab2 = new LabInfo();
      lab2.setName("Bomb Lab");
      lab2.setDescription("...");
      labInfoRepository.save(lab2);
    }
  }
}
