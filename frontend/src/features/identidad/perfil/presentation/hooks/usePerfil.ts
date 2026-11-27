import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../../store'
import { actualizarPerfil } from '../../application/usecase/actualizarPerfil'
import { clearPerfilFeedback } from '../../store/perfil.slice'

export function usePerfil() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.perfil)

  return {
    perfil: data,
    status,
    error,
    actualizar: (values: Parameters<typeof actualizarPerfil>[0]) =>
      dispatch(actualizarPerfil(values)),
    clearFeedback: () => dispatch(clearPerfilFeedback()),
  }
}