package com.kayro.aplication.identidad.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kayro.aplication.identidad.dto.PerfilDto;
import com.kayro.aplication.identidad.dto.UsuarioDto;
import com.kayro.aplication.identidad.query.GetAllUsuariosQuery;
import com.kayro.aplication.identidad.query.GetRedQuery;
import com.kayro.aplication.identidad.shared.dto.FiltroDto;
import com.kayro.aplication.identidad.usecase.EditarPerfilUseCase;
import com.kayro.helpers.ApiResponseWrapper;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping ("/api/usuario")
@AllArgsConstructor 
public class UsuarioController {

    private final GetAllUsuariosQuery getAllUsuariosQuery;

    private final GetRedQuery getRedQuery;

    private final EditarPerfilUseCase editarPerfilUseCase;

    @PutMapping ("/perfil")
    public ResponseEntity<ApiResponseWrapper<UsuarioDto>> editarPerfil(@RequestBody PerfilDto perfilDto) {
        UsuarioDto usuarioDto = editarPerfilUseCase.execute(perfilDto);
        return ResponseEntity.ok(new ApiResponseWrapper<>(true, usuarioDto, "Perfil editado exitosamente", null));
    }

    @GetMapping("/red/{usuarioId}")
    public ResponseEntity<ApiResponseWrapper<List<UsuarioDto>>> obtenerRed(@PathVariable Long usuarioId) {
        List<UsuarioDto> red = getRedQuery.execute(usuarioId);
        return ResponseEntity.ok(new ApiResponseWrapper<>(true, red, "Red obtenida exitosamente", null));
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponseWrapper<java.util.List<UsuarioDto>>> getAllUsers(@RequestBody FiltroDto filtroDto) {
        java.util.List<UsuarioDto> usuarios = getAllUsuariosQuery.execute(filtroDto).getContent();
        return ResponseEntity.ok(new ApiResponseWrapper<>(true, usuarios, "Usuarios obtenidos exitosamente", null));
    }
    
    

    
    
}
