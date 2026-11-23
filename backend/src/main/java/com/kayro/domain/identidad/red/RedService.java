package com.kayro.domain.identidad.red;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kayro.domain.identidad.usuario.Usuario;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RedService {

    private final RedRepository redRepository;

    public void crearRelacionRed(Usuario ancestro, Usuario descendiente, Integer profundidad) {
        RelacionRed relacionRed = new RelacionRed(ancestro, descendiente, profundidad);
        redRepository.save(relacionRed);
    }

    public void CrearRelacionPropia(Usuario usuario) {
        RelacionRed relacionRed = new RelacionRed(usuario, usuario, 0);
        redRepository.save(relacionRed);
    }

    public void registrarAncestros(
            Usuario patrocinador,
            Usuario nuevoUsuario) {

        // Obtener todos los ancestros del patrocinador
        List<RelacionRed> ancestros = redRepository.findByDescendiente_Id(
                patrocinador.getId());

        List<RelacionRed> nuevasRelaciones = new ArrayList<>();

        // Crear las relaciones del nuevo usuario
        for (RelacionRed ancestro : ancestros) {

            nuevasRelaciones.add(
                    new RelacionRed(
                            ancestro.getAncestro(),
                            nuevoUsuario,
                            ancestro.getProfundidad() + 1));
        }

        redRepository.saveAll(nuevasRelaciones);
    }

    public List<RelacionRed> findByAncestroId(Long usuarioId) {
        List<RelacionRed> relaciones = redRepository
                .findByAncestro_IdAndProfundidadBetweenOrderByProfundidadAsc(
                        usuarioId, 1, 7);
        return relaciones;
    }

}
