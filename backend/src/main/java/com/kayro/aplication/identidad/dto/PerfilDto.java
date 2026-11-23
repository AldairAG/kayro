package com.kayro.aplication.identidad.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder 
@AllArgsConstructor 
@Data 
public class PerfilDto {
    private Long id;
    private String nombre;
    private String apellidos;
    private String telefono;
    private String pais;
    private String lada;

}
