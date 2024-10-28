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

import cc.blocklune.csapp.dto.UploadResult;

@Tag(name = "teacher", description = "The operations for teachers")
@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    @Operation(summary = "Upload a file for a specific lab", responses = {
            @ApiResponse(responseCode = "200", description = "The result of the upload"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/labs/{labId}")
    public UploadResult uploadLabFile(@PathVariable Long labId, @RequestParam("file") MultipartFile file) {
        // TODO: Implement
        return new UploadResult(file.getOriginalFilename(), "https://example.com/file.pdf");
    }

    @Operation(summary = "Delete a file for a specific lab", responses = {
            @ApiResponse(responseCode = "200", description = "The result of the deletion"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @DeleteMapping("/labs/{labId}")
    public void deleteLabFile(@PathVariable Long labId, @RequestParam("filename") String filename) {
        // TODO: Implement
    }

    @Operation(summary = "Get the list of students", responses = {
            @ApiResponse(responseCode = "200", description = "The list of students"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/students")
    public void getStudents() {
        // TODO: Implement
    }

    @Operation(summary = "Create a student account", responses = {
            @ApiResponse(responseCode = "200", description = "The result of the creation"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/students")
    public void createStudentAccount() {
        // TODO: Implement
    }

    @Operation(summary = "Update a student account", responses = {
            @ApiResponse(responseCode = "200", description = "The result of the update"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PutMapping("/students")
    public void updateStudentAccount() {
        // TODO: Implement
    }

    @Operation(summary = "Delete a student account", responses = {
            @ApiResponse(responseCode = "200", description = "The result of the deletion"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @DeleteMapping("/students")
    public void deleteStudentAccount() {
        // TODO: Implement
    }

    @Operation(summary = "Get the list of solutions for a specific lab", responses = {
            @ApiResponse(responseCode = "200", description = "The list of solutions"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/students/{studentId}/labs/{labId}")
    public void getStudentSolutionList(@PathVariable Long studentId, @PathVariable Long labId) {
        // TODO: Implement
    }
}
