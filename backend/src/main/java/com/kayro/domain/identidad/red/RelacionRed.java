package com.kayro.domain.identidad.red;

import com.kayro.domain.identidad.usuario.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "red_referidos")
@NoArgsConstructor
@Data 
public class RelacionRed {

    @EmbeddedId
    private RelacionRedId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId ("ancestroId")
    @JoinColumn (name = "ancestro_id")
    private Usuario ancestro;

    @ManyToOne (fetch = FetchType.LAZY)
    @MapsId("descendienteId")
    @JoinColumn(name = "descendiente_id")
    private Usuario descendiente;

    @Column(nullable = false)
    private Integer profundidad;

    public RelacionRed(
            Usuario ancestro,
            Usuario descendiente,
            Integer profundidad) {

        this.ancestro = ancestro;
        this.descendiente = descendiente;
        this.profundidad = profundidad;

        this.id = new RelacionRedId(
            ancestro.getId(),
            descendiente.getId()
        );
    }
}

