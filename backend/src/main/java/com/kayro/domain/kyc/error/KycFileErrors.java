package com.kayro.domain.kyc.error;

import org.springframework.http.HttpStatus;

import com.kayro.middleware.AppError;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor 
@Getter 
public enum KycFileErrors implements AppError {

    DOCUMENTOS_NO_ENCONTRADOS(
            "DOCUMENTOS_NO_ENCONTRADOS",
            "Los documentos no fueron encontrados",
            HttpStatus.NOT_FOUND),
    DOCUMENTO_NO_ENCONTRADO(
            "DOCUMENTO_NO_ENCONTRADO",
            "El documento no fue encontrado",
            HttpStatus.NOT_FOUND)
            ;

    private final String code;
    private final String message;
    private final HttpStatus status;
    
}
