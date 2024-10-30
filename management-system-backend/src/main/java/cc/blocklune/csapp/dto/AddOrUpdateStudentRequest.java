package cc.blocklune.csapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddOrUpdateStudentRequest {
  private String studentId;
  private String rawPassword;
}
