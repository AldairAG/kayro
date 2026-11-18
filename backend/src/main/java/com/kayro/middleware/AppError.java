package com.kayro.middleware;

import org.springframework.http.HttpStatus;

public interface AppError {
    String getCode();
    String getMessage();
    HttpStatus getStatus();


}
