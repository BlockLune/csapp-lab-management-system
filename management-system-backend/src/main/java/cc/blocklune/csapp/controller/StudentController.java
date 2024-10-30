package cc.blocklune.csapp.controller;

import cc.blocklune.csapp.service.OssService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.InputStream;
import java.net.URI;
import java.util.List;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Tag(name = "student", description = "The operations for students")
@RestController
@RequestMapping("/api/students")
public class StudentController {
  private OssService ossService;

  public StudentController(OssService ossService) {
    this.ossService = ossService;
  }

  @Operation(summary = "Upload a solution file for a specific lab", responses = {
      @ApiResponse(responseCode = "201", description = "The file has been uploaded successfully"),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
      @ApiResponse(responseCode = "403", description = "Access denied. Maybe wrong role?")
  })
  @PostMapping(value = "/labs/{labId}/solutions", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<String> uploadSolution(
      @PathVariable Long labId,
      @RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return ResponseEntity.badRequest().body("File is empty");
    }

    String studentId = SecurityContextHolder.getContext().getAuthentication().getName();
    String[] objectNameParts = { "labs", labId.toString(), "solutions", studentId, file.getOriginalFilename() };
    String objectName = String.join("/", objectNameParts);

    try {
      ossService.uploadFile(objectName, file.getInputStream());
      URI location = ServletUriComponentsBuilder.fromCurrentRequest()
          .path("/{fileName}").buildAndExpand(objectName).toUri();
      return ResponseEntity.created(location).body("Solution " + file.getOriginalFilename() + " uploaded!");

    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Failed to read the file's content.");
    }
  }

  @Operation(summary = "Get a list of solution files for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The list of files has been downloaded successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
      @ApiResponse(responseCode = "403", description = "Access denied. Maybe wrong role?")
  })
  @GetMapping("/labs/{labId}/solutions")
  public ResponseEntity<List<String>> downloadSolution(@PathVariable Long labId) {
    String studentId = SecurityContextHolder.getContext().getAuthentication().getName();
    String[] prefixKeyParts = { "labs", labId.toString(), "solutions", studentId };
    String prefixKey = String.join("/", prefixKeyParts);
    return ResponseEntity.ok(ossService.listFiles(prefixKey));
  }

  @Operation(summary = "Download a solution file for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The file has been downloaded successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}/solutions/{fileName}")
  public ResponseEntity<InputStreamResource> downloadSolutionFile(@PathVariable Long labId,
      @PathVariable String fileName) {
    String studentId = SecurityContextHolder.getContext().getAuthentication().getName();
    String[] objectNameParts = { "labs", labId.toString(), "solutions", studentId, fileName };
    String objectName = String.join("/", objectNameParts);
    InputStream inputStream = ossService.downloadFile(objectName);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", fileName);

    InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
    return ResponseEntity.ok().headers(headers).body(inputStreamResource);
  }

  @Operation(summary = "Delete a solution file for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "The file has been deleted successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @DeleteMapping("/labs/{labId}/solutions/{fileName}")
  public void deleteSolutionFile(@PathVariable Long labId, @PathVariable String fileName) {
    String studentId = SecurityContextHolder.getContext().getAuthentication().getName();
    String[] objectNameParts = { "labs", labId.toString(), "solutions", studentId, fileName };
    String objectName = String.join("/", objectNameParts);
    ossService.deleteFile(objectName);
  }
}
