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

@Tag(name = "teacher", description = "The operations for teachers")
@RestController
@RequestMapping("/api")
public class TeacherController {

  @Operation(summary = "Get a list of students", responses = {
      @ApiResponse(responseCode = "200", description = "Get students successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/students")
  public void getStudents() {
    // TODO
  }

  @Operation(summary = "Get a student", responses = {
      @ApiResponse(responseCode = "200", description = "Get student successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PostMapping("/students")
  public void createStudent() {
    // TODO
  }

  @Operation(summary = "Update a student", responses = {
      @ApiResponse(responseCode = "200", description = "Update student successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PutMapping("/students/{studentId}")
  public void updateStudent(@PathVariable Long studentId) {
    // TODO
  }

  @Operation(summary = "Delete a student", responses = {
      @ApiResponse(responseCode = "200", description = "Delete student successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @DeleteMapping("/students/{studentId}")
  public void deleteStudent(@PathVariable Long studentId) {
    // TODO
  }

  @Operation(summary = "Upload a material for a specific lab", responses = {
      @ApiResponse(responseCode = "201", description = "Upload material successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PostMapping("/teachers/labs/{labId}/materials")
  public void uploadMaterial(
      @PathVariable Long labId,
      @RequestParam("file") MultipartFile file) {
    // TODO
  }

  @Operation(summary = "Delete a material for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "Delete material successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @DeleteMapping("/teachers/labs/{labId}/materials/{fileName}")
  public void deleteMaterialFile(
      @PathVariable Long labId,
      @PathVariable String fileName) {
    // TODO
  }

  @Operation(summary = "Get a student's solution for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "Get solutions successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/teachers/labs/{labId}/solutions/{studentId}")
  public void getSolution(
      @PathVariable Long labId,
      @PathVariable Long studentId) {
    // TODO
  }

  @Operation(summary = "Get a specific file of a solution", responses = {
      @ApiResponse(responseCode = "200", description = "Get solution file successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/teachers/labs/{labId}/solutions/{studentId}/{fileName}")
  public void getSolutionFile(
      @PathVariable Long labId,
      @PathVariable Long studentId,
      @PathVariable String fileName) {
    // TODO
  }
}
