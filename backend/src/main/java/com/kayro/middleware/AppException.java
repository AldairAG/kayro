package com.kayro.middleware;

public class AppException extends RuntimeException {

    private final AppError errorCode;

    public AppException(AppError errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public AppError getErrorCode() {
        return errorCode;
    }
}