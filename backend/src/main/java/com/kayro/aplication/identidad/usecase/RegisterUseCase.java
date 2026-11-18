package com.kayro.aplication.identidad.usecase;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kayro.aplication.identidad.dto.AuthRequest;
import com.kayro.aplication.identidad.dto.JwtResponse;
import com.kayro.aplication.identidad.error.AuthErrors;
import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.domain.identidad.usuario.UsuarioService;
import com.kayro.helpers.JwtHelper;
import com.kayro.middleware.AppException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class RegisterUseCase {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtHelper jwtHelper;

    public JwtResponse execute(AuthRequest request) {

        // Verificar si el nombre de ususario existe
        if (usuarioService.existsByEmail(request.getEmail())) {
            throw new AppException(AuthErrors.USUARIO_CORREO_YA_EXISTE);
        }

        if (usuarioService.existsByUsername(request.getUsername())) {
            throw new AppException(AuthErrors.USUARIO_YA_EXISTE);
        }

        //Buscar patrocinador
        Usuario patrociandor= usuarioService.findByUsername(request.getUsername());

        // crear usuario
        Usuario nuevoUsuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .visible(true)
                .rol(request.getRol()) // Por defecto, asignar rol ADMINISTRADOR
                .fechaRegistro(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .patrocinador(patrociandor)
                .build();

        Usuario usuarioGuardado = usuarioService.save(nuevoUsuario);

        // Generar token JWT
        String token = jwtHelper.generateToken(usuarioGuardado);

        return new JwtResponse(token, usuarioGuardado.getId(), usuarioGuardado.getEmail());

    }

}
