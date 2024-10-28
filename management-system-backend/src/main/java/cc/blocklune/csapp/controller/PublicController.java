package cc.blocklune.csapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

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

    @Operation(summary = "Get the names of the materials of a specific lab provided by the teacher", responses = {
            @ApiResponse(responseCode = "200", description = "The names of the materials provided by the teacher"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/labs/{labId}")
    public ResponseEntity<List<String>> getMaterials(@PathVariable Long labId) {
        // TODO: Implement
        return ResponseEntity.ok(List.of());
    }

    @Operation(summary = "Get the specific material's url", responses = {
            @ApiResponse(responseCode = "200", description = "The url of the material"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/labs/{labId}/{filename}")
    public ResponseEntity<String> getMaterial(@PathVariable Long labId, @PathVariable String filename) {
        // TODO: Implement
        return ResponseEntity.ok("");
    }
}
