package com.kayro.aplication.identidad.query;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.kayro.aplication.identidad.dto.UsuarioDto;
import com.kayro.aplication.identidad.mapper.UsuarioMapper;
import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.domain.identidad.usuario.UsuarioService;
import com.kayro.shared.dto.FiltroDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GetAllUsuariosQuery {

    private final UsuarioService usuarioService;

    public Page<UsuarioDto> execute(FiltroDto filtro) {

        Page<Usuario> usuarios = usuarioService.findAllUsuarios(filtro);

        return usuarios.map(UsuarioMapper::toDto);
    }

}
