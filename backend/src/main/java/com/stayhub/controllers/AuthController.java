package com.stayhub.controllers;

import com.stayhub.models.Role;
import com.stayhub.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public record RegisterReq(String email, String password, String firstName, String lastName, Role role) {}
    public record LoginReq(String email, String password) {}

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterReq req) {
        return ResponseEntity.ok(authService.register(req.email(), req.password(), req.firstName(), req.lastName(), req.role()));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginReq req) {
        return ResponseEntity.ok(authService.login(req.email(), req.password()));
    }
}