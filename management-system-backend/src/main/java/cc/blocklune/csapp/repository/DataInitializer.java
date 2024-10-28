package cc.blocklune.csapp.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import cc.blocklune.csapp.model.SystemUser;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private SystemUserRepository userRepository;

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
    }
}
