package com.kayro.domain.identidad.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kayro.domain.identidad.usuario.UsuarioService;

import lombok.AllArgsConstructor;

@Service 
@AllArgsConstructor 
public class AuthService implements UserDetailsService{

    private final UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioService.findByUsername(username);
    }
    

}
