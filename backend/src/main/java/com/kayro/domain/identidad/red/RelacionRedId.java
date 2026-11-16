package com.kayro.domain.identidad.red;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable 
@Getter 
@NoArgsConstructor 
@AllArgsConstructor 
@EqualsAndHashCode 
public class RelacionRedId implements Serializable {

    @Column (name = "ancestro_id")
    private Long ancestroId;

    @Column(name = "descendiente_id")
    private Long descendienteId;
}