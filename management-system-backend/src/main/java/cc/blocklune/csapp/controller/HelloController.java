package cc.blocklune.csapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "hello", description = "The hello API for testing")
@RestController
public class HelloController {
    @Operation(summary = "Say hello", responses = {
            @ApiResponse(responseCode = "200", description = "Hello!"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello!");
    }
}