package cc.blocklune.csapp.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "my_lab_info_table")
@Schema(description = "Lab info")
public class LabInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(description = "The ID of the lab")
  private Long id;

  @Column(unique = true, nullable = false)
  @Schema(description = "The name of the lab. Must be unique")
  private String name;

  @Column(columnDefinition = "TEXT")
  @Schema(description = "The description of the lab")
  private String description;
}
