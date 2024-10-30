package cc.blocklune.csapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cc.blocklune.csapp.service.OssService;

@Tag(name = "student", description = "The operations for students")
@RestController
@RequestMapping("/api/student")
public class StudentController {
  private OssService ossService;

  public StudentController(OssService ossService) {
    this.ossService = ossService;
  }

  @Operation(summary = "Upload a file for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The result of the upload"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PostMapping(value = "/labs/{labId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<String> uploadSolution(
      @PathVariable Long labId,
      @RequestParam("file") MultipartFile file) {
    // TODO: use lab id
    if (file.isEmpty()) {
      return ResponseEntity.badRequest().body("File is empty");
    }
    try {
      ossService.uploadFile(file.getOriginalFilename(), file.getInputStream());
      // TODO: Use Created (URL needed)
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Failed to read the file's content.");
    }
  }

  @Operation(summary = "Get the names of the uploaded files for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The names of the uploaded files"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}")
  public void getSolutions(@PathVariable Long labId) {
    // TODO: Implement
  }

  @Operation(summary = "Remove a file of a solution for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The result of the removal"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @DeleteMapping("/labs/{labId}/{filename}")
  public void removeSolution(@PathVariable Long labId, @PathVariable String filename) {
    // TODO: Implement
  }
}
