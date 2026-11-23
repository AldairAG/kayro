package com.kayro.domain.identidad.usuario;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.kayro.domain.identidad.perfil.Perfil;
import com.kayro.domain.identidad.usuario.enums.Rol;
import com.kayro.domain.identidad.usuario.enums.TipoRango;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "usuarios", indexes = {
        @Index(name = "idx_email", columnList = "email"),
        @Index(name = "idx_username", columnList = "username"),
})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, name = "username")
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime fechaRegistro;

    private boolean visible;

    @Enumerated(EnumType.STRING)
    private TipoRango rango;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    private LocalDateTime createdAt;

    // Patrocinador directo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patrocinador_id")
    private Usuario patrocinador;

    // Usuarios invitados directamente
    @OneToMany(mappedBy = "patrocinador")
    @Builder.Default
    private List<Usuario> referidosDirectos = new ArrayList<>();

    // RELACIONES

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Perfil perfil;


    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
        if (perfil != null) {
            perfil.setUsuario(this);
        }
    }

    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + rol.name()));
    }
}
