package cc.blocklune.csapp.controller;

import cc.blocklune.csapp.dto.AddOrUpdateStudentRequest;
import cc.blocklune.csapp.service.OssService;
import cc.blocklune.csapp.service.SystemUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.InputStream;
import java.net.URI;
import java.util.List;
import java.util.Set;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Tag(name = "teacher", description = "The operations for teachers")
@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
  private final SystemUserService systemUserService;
  private OssService ossService;

  public TeacherController(SystemUserService systemUserService, OssService ossService) {
    this.systemUserService = systemUserService;
    this.ossService = ossService;
  }

  @Operation(summary = "Get a list of students's names", responses = {
      @ApiResponse(responseCode = "200", description = "Get students successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/students")
  public ResponseEntity<Set<String>> getStudents() {
    return ResponseEntity.ok(systemUserService.getStudentNameList());
  }

  @Operation(summary = "Add a student", responses = {
      @ApiResponse(responseCode = "201", description = "Add successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PostMapping("/students")
  public ResponseEntity<String> AddStudent(@RequestBody AddOrUpdateStudentRequest request) {
    systemUserService.addStudent(
        request.getStudentId(),
        request.getRawPassword());
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(request.getStudentId())
        .toUri();
    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "Update a student", responses = {
      @ApiResponse(responseCode = "200", description = "Update student successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PutMapping("/students/{studentId}")
  public ResponseEntity<String> updateStudent(
      @PathVariable String studentId,
      @RequestBody AddOrUpdateStudentRequest request) {
    systemUserService.updateStudent(
        request.getStudentId(),
        request.getRawPassword());
    return ResponseEntity.ok("Student " + studentId + " updated!");
  }

  @Operation(summary = "Delete a student", responses = {
      @ApiResponse(responseCode = "200", description = "Delete student successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @DeleteMapping("/students/{studentId}")
  public ResponseEntity<String> deleteStudent(@PathVariable String studentId) {
    systemUserService.deleteStudent(studentId);
    return ResponseEntity.ok("Student " + studentId + " deleted!");
  }

  @Operation(summary = "Upload a material for a specific lab", responses = {
      @ApiResponse(responseCode = "201", description = "The file has been uploaded successfully"),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
      @ApiResponse(responseCode = "403", description = "Access denied. Maybe wrong role?")
  })
  @PostMapping(value = "/labs/{labId}/materials", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<String> uploadMaterial(
      @PathVariable Long labId,
      @RequestParam("file") MultipartFile file) {

    if (file.isEmpty()) {
      return ResponseEntity.badRequest().body("File is empty");
    }

    String[] objectNameParts = { "labs", labId.toString(), "materials", file.getOriginalFilename() };
    String objectName = String.join("/", objectNameParts);

    try {
      ossService.uploadFile(objectName, file.getInputStream());
      URI location = ServletUriComponentsBuilder.fromCurrentRequest()
          .path("/{fileName}").buildAndExpand(objectName).toUri();
      return ResponseEntity.created(location).body("Material " + file.getOriginalFilename() + " uploaded!");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Failed to read the file's content.");
    }
  }

  @Operation(summary = "Delete a material for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "Delete material successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @DeleteMapping("/labs/{labId}/materials/{fileName}")
  public ResponseEntity<String> deleteMaterialFile(
      @PathVariable Long labId,
      @PathVariable String fileName) {
    String[] objectNameParts = { "labs", labId.toString(), "materials", fileName };
    String objectName = String.join("/", objectNameParts);
    ossService.deleteFile(objectName);
    return ResponseEntity.ok().body("Material " + fileName + " deleted!");
  }

  @Operation(summary = "Get a student's solution for a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "Get solutions successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}/solutions/{studentId}")
  public ResponseEntity<List<String>> getSolution(
      @PathVariable Long labId,
      @PathVariable String studentId) {
    String[] prefixKeyParts = { "labs", labId.toString(), "solutions", studentId };
    String prefixKey = String.join("/", prefixKeyParts);
    return ResponseEntity.ok(ossService.listFiles(prefixKey));
  }

  @Operation(summary = "Get a specific file of a solution", responses = {
      @ApiResponse(responseCode = "200", description = "Get solution file successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}/solutions/{studentId}/{fileName}")
  public ResponseEntity<InputStreamResource> getSolutionFile(
      @PathVariable Long labId,
      @PathVariable String studentId,
      @PathVariable String fileName) {
    String[] objectNameParts = { "labs", labId.toString(), "solutions", studentId, fileName };
    String objectName = String.join("/", objectNameParts);
    InputStream inputStream = ossService.downloadFile(objectName);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", fileName);

    InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
    return ResponseEntity.ok().headers(headers).body(inputStreamResource);
  }

  @Operation(summary = "Check the status of the service", responses = {
      @ApiResponse(responseCode = "200", description = "Service is running"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/status")
  public ResponseEntity<String> checkStatus() {
    return ResponseEntity.ok("OK");
  }
}
