package cc.blocklune.csapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cc.blocklune.csapp.service.AuthService;
import cc.blocklune.csapp.dto.LoginRequest;
import cc.blocklune.csapp.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword()));
    }
}
