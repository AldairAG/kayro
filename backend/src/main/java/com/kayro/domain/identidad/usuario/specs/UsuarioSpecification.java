package com.kayro.domain.identidad.usuario.specs;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.kayro.domain.identidad.usuario.Usuario;
import com.kayro.shared.dto.FiltroDto;

import jakarta.persistence.criteria.Predicate;

public class UsuarioSpecification {

    public static Specification<Usuario> aplicarFiltro(FiltroDto filtro) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Búsqueda por username o email
            if (filtro.getBusqueda() != null &&
                !filtro.getBusqueda().isBlank()) {

                String busqueda = "%" +
                    filtro.getBusqueda().trim().toLowerCase() + "%";

                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("username")), busqueda),
                    cb.like(cb.lower(root.get("email")), busqueda)
                ));
            }

            // Fecha desde
            if (filtro.getFechaDesde() != null) {
                predicates.add(cb.greaterThanOrEqualTo(
                    root.get("fechaRegistro"),
                    filtro.getFechaDesde()
                ));
            }

            // Fecha hasta
            if (filtro.getFechaHasta() != null) {
                predicates.add(cb.lessThanOrEqualTo(
                    root.get("fechaRegistro"),
                    filtro.getFechaHasta()
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
