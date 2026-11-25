package com.kayro.shared.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
    
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class FiltroDto {

    private String busqueda;

    private LocalDateTime fechaDesde;

    private LocalDateTime fechaHasta;

    private String ordenarPor = "fechaRegistro";

    private String direccion = "DESC";

    private Integer pagina = 0;

    private Integer tamanio = 10;
}