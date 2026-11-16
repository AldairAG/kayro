package com.kayro.domain.identidad.perfil;

import com.kayro.domain.identidad.usuario.Usuario;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String telefono;
    private String pais;
    private String lada;

    private String fotoPerfilName;

    // RELACIONES
    @OneToOne(optional = true)
    @JoinColumn (name = "usuario_id", nullable = true)
    private Usuario usuario;
}
