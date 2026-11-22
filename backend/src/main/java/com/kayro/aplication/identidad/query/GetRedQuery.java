package com.kayro.aplication.identidad.query;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.kayro.aplication.identidad.dto.UsuarioDto;
import com.kayro.aplication.identidad.mapper.UsuarioMapper;
import com.kayro.domain.identidad.red.RedService;
import com.kayro.domain.identidad.red.RelacionRed;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class GetRedQuery {

    private final RedService redService;

    public List<UsuarioDto> execute(Long usuarioId) {

        List<RelacionRed> relaciones = redService.findByAncestroId(usuarioId);

        return relaciones.stream()
                .map(relacion -> {
                    UsuarioDto usuarioDto = UsuarioMapper.toDtoWithNivel(
                            relacion.getDescendiente(), relacion.getProfundidad());
                    return usuarioDto;
                })
                .collect(Collectors.toList());
    }

}
