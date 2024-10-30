package cc.blocklune.csapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import cc.blocklune.csapp.model.SystemUser;
import java.util.Optional;
import java.util.Set;

@Repository
public interface SystemUserRepository extends JpaRepository<SystemUser, Long> {
  Optional<SystemUser> findByUsername(String username);

  Optional<Set<String>> findRolesByUsername(String username);

  @Query("SELECT u FROM SystemUser u JOIN u.roles r WHERE r = :role")
  Set<SystemUser> findByRole(String role);
}
