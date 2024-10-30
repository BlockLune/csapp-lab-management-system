package cc.blocklune.csapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Tag(name = "public", description = "Public APIs")
@RestController
@RequestMapping("/api/public")
public class PublicController {
  @Operation(summary = "Say hello", responses = {
      @ApiResponse(responseCode = "200", description = "Hello!"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @GetMapping("/hello")
  public ResponseEntity<String> hello() {
    return ResponseEntity.ok("Hello from the CSAPP management system!");
  }

  @GetMapping("/labs")
  public void getLabs() {
    // TODO
  }

  @GetMapping("/labs/{labId}/materials")
  public void getMaterials(@PathVariable Long labId) {
    // TODO
  }

  @GetMapping("/labs/{labId}/materials/{fileName}")
  public void getMaterial(
      @PathVariable Long labId,
      @PathVariable String fileName) {
    // TODO
  }
}
