package cc.blocklune.csapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import cc.blocklune.csapp.model.SystemUser;
import java.util.Optional;
import java.util.Set;

@Repository
public interface SystemUserRepository extends JpaRepository<SystemUser, Long> {
  Optional<SystemUser> findByUsername(String username);

  Optional<Set<String>> findRolesByUsername(String username);
}
