package com.kayro.domain.kyc;

import java.time.LocalDateTime;

import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.domain.kyc.enums.EstadoKyc;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
@Builder
public class KycFile {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    private String filePath;

    private String motivoRechazo;

    @Enumerated(EnumType.STRING)
    private EstadoKyc estadoKyc;

    private LocalDateTime fechaSubida;

    @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
