package com.kayro.aplication.identidad.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kayro.aplication.identidad.dto.AuthRequest;
import com.kayro.aplication.identidad.dto.JwtResponse;
import com.kayro.aplication.identidad.error.AuthSucces;
import com.kayro.aplication.identidad.usecase.LoginUseCase;
import com.kayro.aplication.identidad.usecase.RegisterUseCase;
import com.kayro.helpers.ApiResponseWrapper;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.AllArgsConstructor;

@RestController 
@RequestMapping ("/api/auth")
@AllArgsConstructor 
public class AuthController {
    
    private final LoginUseCase loginUseCase;

    private final RegisterUseCase registerUseCase;

        @PostMapping("/registro")
    public ResponseEntity<ApiResponseWrapper<JwtResponse>> registrar(@RequestBody AuthRequest request) {
        JwtResponse response = registerUseCase.execute(request);
        return ResponseEntity.ok(new ApiResponseWrapper<>(true, response, AuthSucces.REGISTRO_EXITOSO.name(), null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseWrapper<JwtResponse>> login(@RequestBody AuthRequest request) {
        JwtResponse response = loginUseCase.execute(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new ApiResponseWrapper<>(true, response, AuthSucces.LOGIN_EXITOSO.name(), null));
    }

}
