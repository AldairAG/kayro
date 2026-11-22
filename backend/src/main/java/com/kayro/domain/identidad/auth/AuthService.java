package com.kayro.domain.identidad.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.domain.identidad.usuario.UsuarioService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService implements UserDetailsService {

    private final UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioService.findByUsername(username);
    }

    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No hay un usuario autenticado");
        }
        Usuario usuario = usuarioService.findById(((Usuario) authentication.getPrincipal()).getId());
        if (usuario == null) {
            throw new RuntimeException("No se encontró el usuario autenticado");
        }
        return usuario;
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No hay un usuario autenticado");
        }

        Usuario usuario = ((Usuario) authentication.getPrincipal());

        return usuario.getId();
    }

}
