package com.kayro.aplication.identidad.usecase;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kayro.aplication.identidad.dto.AuthRequest;
import com.kayro.aplication.identidad.dto.JwtResponse;
import com.kayro.aplication.identidad.error.AuthErrors;
import com.kayro.domain.identidad.perfil.Perfil;
import com.kayro.domain.identidad.red.RedService;
import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.domain.identidad.usuario.UsuarioService;
import com.kayro.domain.identidad.usuario.enums.Rol;
import com.kayro.domain.identidad.usuario.enums.TipoRango;
import com.kayro.helpers.JwtHelper;
import com.kayro.middleware.AppException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class RegisterUseCase {

    private final UsuarioService usuarioService;
    private final RedService redService;
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

        Usuario patrocinador = null;

        if (request.getPatrocinador() != null &&
                !request.getPatrocinador().isBlank()) {

            patrocinador = usuarioService
                    .findByUsername(request.getPatrocinador());
        }

        //cREAR PERFIL
        Perfil perfil = Perfil.builder()
                .nombre(request.getNombre())
                .apellidos(request.getApellido())
                .telefono(request.getTelefono())
                .lada(request.getLada())
                .telefono(request.getTelefono())
                .build();

        Usuario usuario = Usuario.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fechaRegistro(LocalDateTime.now())
                .visible(true)
                .rol(Rol.ADMINISTRADOR)
                .rango(TipoRango.RANGO_0)
                .patrocinador(patrocinador)
                .build();
        
        usuario.setPerfil(perfil);

        Usuario guardado = usuarioService.save(usuario);

        // Registrar su relación consigo mismo
        redService.CrearRelacionPropia(guardado);

        // Registrar sus ancestros solamente si tiene patrocinador
        if (patrocinador != null) {
            redService.registrarAncestros(patrocinador, usuario);
        }

        // Generar token JWT
        String token = jwtHelper.generateToken(guardado);

        return new JwtResponse(token, guardado.getId(), guardado.getEmail());
    }

}
