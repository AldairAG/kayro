package com.kayro.domain.identidad.usuario;

import org.springframework.stereotype.Service;

import com.kayro.domain.identidad.usuario.error.UsuarioErrors;
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

    public Usuario findByUsername(String username){
        return repository.findByUsername(username)
                .orElseThrow(() -> new AppException(UsuarioErrors.USUARIO_NO_ENCONTRADO)); 
    }

}
