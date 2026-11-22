package com.kayro.domain.identidad.usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UsuarioRepository extends JpaRepository<Usuario,Long>,JpaSpecificationExecutor<Usuario>{
    
    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByUsername(String username);

}
