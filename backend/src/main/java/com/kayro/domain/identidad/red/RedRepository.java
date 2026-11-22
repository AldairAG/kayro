package com.kayro.domain.identidad.red;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RedRepository extends JpaRepository<RelacionRed,RelacionRedId>{
    
    List<RelacionRed> findByDescendiente_Id(Long descendienteId);

    List<RelacionRed> findByAncestro_IdAndProfundidadBetweenOrderByProfundidadAsc(
        Long ancestroId, Integer profundidadMinima, Integer profundidadMaxima
    );

}
