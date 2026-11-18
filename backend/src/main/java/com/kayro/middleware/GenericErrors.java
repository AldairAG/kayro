package com.kayro.middleware;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GenericErrors implements AppError {

    INTERNAL_ERROR(
            "INTERNAL_ERROR",
            "Ocurrió un error interno",
            HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String message;
    private final HttpStatus status;

}
