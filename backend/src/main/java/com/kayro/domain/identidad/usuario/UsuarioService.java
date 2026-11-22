package com.kayro.domain.identidad.usuario;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.kayro.aplication.identidad.shared.dto.FiltroDto;
import com.kayro.domain.identidad.usuario.error.UsuarioErrors;
import com.kayro.domain.identidad.usuario.specs.UsuarioSpecification;
import com.kayro.middleware.AppException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public Usuario findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new AppException(UsuarioErrors.USUARIO_NO_ENCONTRADO));
    }

    public Usuario save(Usuario usuario) {
        return repository.save(usuario);
    }

    public Boolean existsByEmail(String email) {
        return repository.findByEmail(email).isPresent();
    }

    public Boolean existsByUsername(String email) {
        return repository.findByEmail(email).isPresent();
    }

    public Usuario findByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new AppException(UsuarioErrors.USUARIO_NO_ENCONTRADO));
    }

    public Usuario findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new AppException(UsuarioErrors.USUARIO_NO_ENCONTRADO));
    }

    public Page<Usuario> findAllUsuarios(FiltroDto filtro) {

        int pagina = filtro.getPagina() != null
                ? Math.max(filtro.getPagina(), 0)
                : 0;

        int tamanio = filtro.getTamanio() != null
                ? Math.min(Math.max(filtro.getTamanio(), 1), 100)
                : 10;

        Set<String> camposPermitidos = Set.of(
                "username",
                "email",
                "fechaRegistro",
                "createdAt");

        String campo = camposPermitidos.contains(filtro.getOrdenarPor())
                ? filtro.getOrdenarPor()
                : "fechaRegistro";

        Sort.Direction direccion = "ASC".equalsIgnoreCase(filtro.getDireccion())
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(
                pagina,
                tamanio,
                Sort.by(direccion, campo));

        Specification<Usuario> specification = UsuarioSpecification.aplicarFiltro(filtro);

        return repository.findAll(specification, pageable);
    }

}
