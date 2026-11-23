package com.kayro.aplication.identidad.usecase;

import org.springframework.stereotype.Service;

import com.kayro.aplication.identidad.dto.PerfilDto;
import com.kayro.aplication.identidad.dto.UsuarioDto;
import com.kayro.aplication.identidad.mapper.UsuarioMapper;
import com.kayro.domain.identidad.auth.AuthService;
import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.domain.identidad.usuario.UsuarioService;

import lombok.AllArgsConstructor;

@Service 
@AllArgsConstructor 
public class EditarPerfilUseCase {

    private final AuthService authService;

    private final UsuarioService usuarioService;
    
    public UsuarioDto execute(PerfilDto perfilDto) {

        Usuario usuario = authService.getCurrentUser();

        usuario.getPerfil().setNombre(perfilDto.getNombre());
        usuario.getPerfil().setApellidos(perfilDto.getApellidos());
        usuario.getPerfil().setTelefono(perfilDto.getTelefono());
        usuario.getPerfil().setPais(perfilDto.getPais());
        usuario.getPerfil().setLada(perfilDto.getLada());

        return UsuarioMapper.toDto(usuarioService.save(usuario));

    }

}
