package com.kayro.aplication.identidad.mapper;

import com.kayro.aplication.identidad.dto.PerfilDto;
import com.kayro.domain.identidad.perfil.Perfil;

public class PerfilMapper {
    
    public static PerfilDto toDto(Perfil perfil) {
        if (perfil == null) {
            return null;
        }
        return PerfilDto.builder()
                .id(perfil.getId())
                .nombre(perfil.getNombre())
                .apellidos(perfil.getApellidos())
                .telefono(perfil.getTelefono())
                .pais(perfil.getPais())
                .lada(perfil.getLada())
                .build();
    }

}
