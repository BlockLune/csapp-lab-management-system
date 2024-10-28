package cc.blocklune.csapp.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@Tag(name = "student", description = "The operations for students")
@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Operation(summary = "Upload a file for a specific lab", responses = {
            @ApiResponse(responseCode = "200", description = "The result of the upload"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/labs/{labId}")
    public void uploadSolution(@PathVariable Long labId) {
        // TODO: Implement
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
