package com.kayro.aplication.identidad.dto;

import java.time.LocalDateTime;

import com.kayro.domain.identidad.usuario.enums.Rol;

import lombok.Data;

@Data 
public class AuthRequest {
    private String email;
    private String password;
    private String nombre;
    private String apellido;
    private String telefono;
    private String lada;
    private LocalDateTime ultimoAcceso;
    private LocalDateTime updatedAt;
    private Rol rol;
    private String username;
    private String patrocinador;
}

