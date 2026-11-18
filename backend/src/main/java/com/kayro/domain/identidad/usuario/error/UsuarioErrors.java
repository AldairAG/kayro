package com.kayro.domain.identidad.usuario.error;

import org.springframework.http.HttpStatus;

import com.kayro.middleware.AppError;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UsuarioErrors implements AppError {

    USUARIO_NO_ENCONTRADO(
            "USUARIO_NO_ENCONTRADO",
            "El usuario no fue encontrado",
            HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
