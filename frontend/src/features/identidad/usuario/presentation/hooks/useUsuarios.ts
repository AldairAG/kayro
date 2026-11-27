import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../../store'
import { obtenerUsuarios } from '../../application/query/obtenerUsuarios'

export function useUsuarios() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.usuario)

  return {
    usuarios: data,
    status,
    error,
    cargar: useCallback(() => dispatch(obtenerUsuarios()), [dispatch]),
  }
}
