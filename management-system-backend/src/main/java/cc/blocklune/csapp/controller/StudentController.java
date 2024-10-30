package cc.blocklune.csapp.controller;

import cc.blocklune.csapp.service.OssService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "student", description = "The operations for students")
@RestController
@RequestMapping("/api/student")
public class StudentController {
  private OssService ossService;

  public StudentController(OssService ossService) {
    this.ossService = ossService;
  }

  @Operation(summary = "Upload a solution file for a specific lab", responses = {
      @ApiResponse(responseCode = "201", description = "The file has been uploaded successfully"),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PostMapping(value = "/labs/{labId}/solutions", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<String> uploadSolution(
      @PathVariable Long labId,
      @RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return ResponseEntity.badRequest().body("File is empty");
    }

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String name = authentication.getName();
    String objectName = "STUDENT" + "_" + name + "_" + labId + file.getOriginalFilename();
    try {
      ossService.uploadFile(objectName, file.getInputStream());
      // TODO: Use Created (URL needed)
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Failed to read the file's content.");
    }
  }

  @Operation(summary = "Download a list of solution files for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The file has been downloaded successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}/solutions")
  public void downloadSolution(@PathVariable Long labId) {
  }

  @Operation(summary = "Download a solution file for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The file has been downloaded successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}/solutions/{fileName}")
  public void downloadSolutionFile(@PathVariable Long labId, @PathVariable String fileName) {
  }

  @Operation(summary = "Delete a solution file for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The file has been deleted successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @DeleteMapping("/labs/{labId}/solutions/{fileName}")
  public void deleteSolutionFile(@PathVariable Long labId, @PathVariable String fileName) {
  }
}
