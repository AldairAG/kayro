package com.kayro.aplication.identidad.error;

import org.springframework.http.HttpStatus;

import com.kayro.middleware.AppError;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthErrors implements AppError {

    USUARIO_YA_EXISTE(
            "USUARIO_YA_EXISTE",
            "El usuario ya existe",
            HttpStatus.CONFLICT),

    USUARIO_CORREO_YA_EXISTE(
            "USUARIO_CORREO_YA_EXISTE",
            "El correo del usuario ya está registrado",
            HttpStatus.CONFLICT),

    USUARIO_NO_ENCONTRADO(
            "USUARIO_NO_ENCONTRADO",
            "El usuario no fue encontrado",
            HttpStatus.NOT_FOUND),

    CREDENCIALES_INVALIDAS(
            "CREDENCIALES_INVALIDAS",
            "Las credenciales son incorrectas",
            HttpStatus.UNAUTHORIZED),
    EMAIL_Y_PASSWORD_REQUERIDOS(
            "EMAIL_Y_PASSWORD_REQUERIDOS",
            "Email y password son requeridos",
            HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
