package cc.blocklune.csapp.repository;

import cc.blocklune.csapp.model.LabInfo;
import cc.blocklune.csapp.model.SystemUser;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

  @Value("${init.teacher.username}")
  private String initTeacherUsername;

  @Value("${init.teacher.password}")
  private String initTeacherPassword;

  @Override
  public void run(String... args) throws Exception {
    if (userRepository.count() == 0) {
      SystemUser teacher = new SystemUser();
      teacher.setUsername(initTeacherUsername);
      teacher.setPassword(passwordEncoder.encode(initTeacherPassword));
      teacher.setRoles(Set.of("TEACHER"));
      userRepository.save(teacher);
    }

    if (labInfoRepository.count() == 0) {
      LabInfo lab1 = new LabInfo();
      lab1.setName("Data Lab");
      lab1.setDescription(
          "Students implement simple logical, two's complement, and floating point functions, but using a highly restricted subset of C. For example, they might be asked to compute the absolute value of a number using only bit-level operations and straightline code. This lab helps students understand the bit-level representations of C data types and the bit-level behavior of the operations on data.");
      labInfoRepository.save(lab1);

      LabInfo lab2 = new LabInfo();
      lab2.setName("Bomb Lab");
      lab2.setDescription(
          "A binary bomb is a program provided to students as an object code file. When run, it prompts the user to type in 6 different strings. If any of these is incorrect, the bomb explodes, printing an error message and logging the event on a grading server. Students must defuse their own unique bomb by disassembling and reverse engineering the program to determine what the 6 strings should be. The lab teaches students to understand assembly language, and also forces them to learn how to use a debugger. It's also great fun. A legendary lab among the CMU undergrads.");
      labInfoRepository.save(lab2);

      LabInfo lab3 = new LabInfo();
      lab3.setName("Attack Lab");
      lab3.setDescription(
          "Students are given a pair of unique custom-generated x86-64 binary executables, called targets, that have buffer overflow bugs. One target is vulnerable to code injection attacks. The other is vulnerable to return-oriented programming attacks. Students are asked to modify the behavior of the targets by developing exploits based on either code injection or return-oriented programming. This lab teaches the students about the stack discipline and teaches them about the danger of writing code that is vulnerable to buffer overflow attacks.");
      labInfoRepository.save(lab3);

      LabInfo lab4 = new LabInfo();
      lab4.setName("Architecture Lab");
      lab4.setDescription(
          "Students are given a small default Y86-64 array copying function and a working pipelined Y86-64 processor design that runs the copy function in some nominal number of clock cycles per array element (CPE). The students attempt to minimize the CPE by modifying both the function and the processor design. This gives the students a deep appreciation for the interactions between hardware and software.");
      labInfoRepository.save(lab4);
    }
  }
}
