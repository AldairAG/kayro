package com.kayro.aplication.identidad.usecase;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.kayro.aplication.identidad.dto.JwtResponse;
import com.kayro.aplication.identidad.error.AuthErrors;
import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.helpers.JwtHelper;
import com.kayro.middleware.AppException;

import lombok.AllArgsConstructor;

@Service 
@AllArgsConstructor 
public class LoginUseCase {

    private final AuthenticationManager authenticationManager;
    private final JwtHelper jwtHelper;

    public JwtResponse execute(String email, String password) {

        if (email == null || password == null) {
            throw new AppException(AuthErrors.EMAIL_Y_PASSWORD_REQUERIDOS);
        }

        // Autenticar usuario
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        // Obtener usuario autenticado
        Usuario usuario = (Usuario) authentication.getPrincipal();

        // Actualizar último acceso
        //usuario.setUltimoAcceso(LocalDateTime.now());
        //usuarioService.save(usuario);

        // Generar token JWT
        String token = jwtHelper.generateToken(usuario);

        return new JwtResponse(token, usuario.getId(), usuario.getEmail());
    }

}
