package com.kayro.aplication.identidad.mapper;

import com.kayro.aplication.identidad.dto.UsuarioDto;
import com.kayro.domain.identidad.usuario.Usuario;

public class UsuarioMapper {
    
    public static UsuarioDto toDto(Usuario usuario) {
        if (usuario == null) {
            return null;
        }
        return UsuarioDto.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .email(usuario.getEmail())
                .perfil(PerfilMapper.toDto(usuario.getPerfil()))
                .build();
    }

    public static UsuarioDto toDtoWithNivel(Usuario usuario, Integer nivel) {
        if (usuario == null) {
            return null;
        }
        return UsuarioDto.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .perfil(PerfilMapper.toDto(usuario.getPerfil()))
                .nivel(nivel)
                .build();
    }

}
