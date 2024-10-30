package cc.blocklune.csapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cc.blocklune.csapp.dto.UploadResult;

@Tag(name = "teacher", description = "The operations for teachers")
@RestController
@RequestMapping("/api")
public class TeacherController {

  @GetMapping("/students")
  public void getStudents() {
    // TODO
  }

  @PostMapping("/students")
  public void createStudent() {
    // TODO
  }

  @PutMapping("/students/{studentId}")
  public void updateStudent(@PathVariable Long studentId) {
    // TODO
  }

  @DeleteMapping("/students/{studentId}")
  public void deleteStudent(@PathVariable Long studentId) {
    // TODO
  }

  @PostMapping("/teachers/labs/{labId}/materials")
  public void uploadMaterial(
      @PathVariable Long labId,
      @RequestParam("file") MultipartFile file) {
    // TODO
  }

  @DeleteMapping("/teachers/labs/{labId}/materials/{fileName}")
  public void deleteMaterialFile(
      @PathVariable Long labId,
      @PathVariable String fileName) {
    // TODO
  }

  @GetMapping("/teachers/labs/{labId}/solutions/{studentId}")
  public void getSolution(
      @PathVariable Long labId,
      @PathVariable Long studentId) {
    // TODO
  }

  @GetMapping("/teachers/labs/{labId}/solutions/{studentId}/{fileName}")
  public void getSolutionFile(
      @PathVariable Long labId,
      @PathVariable Long studentId,
      @PathVariable String fileName) {
    // TODO
  }
}
