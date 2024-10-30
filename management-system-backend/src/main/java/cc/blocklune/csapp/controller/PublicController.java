package cc.blocklune.csapp.controller;

import cc.blocklune.csapp.service.OssService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "public", description = "Public APIs")
@RestController
@RequestMapping("/api/public")
public class PublicController {
  private OssService ossService;

  public PublicController(OssService ossService) {
    this.ossService = ossService;
  }

  @Operation(summary = "Say hello", responses = {
      @ApiResponse(responseCode = "200", description = "Hello!"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/hello")
  public ResponseEntity<String> hello() {
    return ResponseEntity.ok("Hello from the CSAPP management system!");
  }

  @Operation(summary = "Get labs", responses = {
      @ApiResponse(responseCode = "200", description = "Get labs successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs")
  public void getLabs() {
    // TODO
  }

  @Operation(summary = "Get materials of a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "Get materials successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}/materials")
  public ResponseEntity<List<String>> getMaterials(@PathVariable Long labId) {
    String[] prefixKeyParts = { "labs", labId.toString(), "materials" };
    String prefixKey = String.join("/", prefixKeyParts);
    return ResponseEntity.ok(ossService.listFiles(prefixKey));
  }

  @Operation(summary = "Get a material file of a specific lab", responses = {
      @ApiResponse(responseCode = "200", description = "Get material file successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/labs/{labId}/materials/{fileName}")
  public ResponseEntity<InputStreamResource> getMaterialFile(
      @PathVariable Long labId,
      @PathVariable String fileName) {
    String[] objectNameParts = { "labs", labId.toString(), "materials", fileName };
    String objectName = String.join("/", objectNameParts);
    InputStream inputStream = ossService.downloadFile(objectName);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", fileName);

    InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
    return ResponseEntity.ok().headers(headers).body(inputStreamResource);
  }
}
