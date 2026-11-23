package com.kayro.aplication.identidad.dto;

import java.time.LocalDateTime;

import com.kayro.domain.identidad.usuario.enums.Rol;
import com.kayro.domain.identidad.usuario.enums.TipoRango;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data 
@AllArgsConstructor 
@Builder 
public class UsuarioDto {
    private Long id;

    private String username;

    private String password;

    private String email;

    private LocalDateTime fechaRegistro;

    private boolean visible;

    private TipoRango rango;

    private Rol rol;

    private LocalDateTime createdAt;

    private String patrocinadorUsername;

    private PerfilDto perfil;

    private Integer nivel;

}
