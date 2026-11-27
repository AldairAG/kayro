import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../../store'
import { obtenerRed } from '../../application/query/obtenerRed'

export function useRed() {
  const dispatch = useDispatch<AppDispatch>()
  const usuarioId = useSelector((state: RootState) => state.auth.user?.id ?? null)
  const { data, status, error } = useSelector((state: RootState) => state.red)

  return {
    red: data,
    status,
    error,
    usuarioId,
    cargar: useCallback(
      () => (usuarioId === null ? undefined : dispatch(obtenerRed(usuarioId))),
      [dispatch, usuarioId],
    ),
  }
}
