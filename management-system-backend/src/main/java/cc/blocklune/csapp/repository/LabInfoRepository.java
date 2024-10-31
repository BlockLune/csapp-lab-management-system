package cc.blocklune.csapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import cc.blocklune.csapp.model.LabInfo;

@Repository
public interface LabInfoRepository extends JpaRepository<LabInfo, Long> {
}
