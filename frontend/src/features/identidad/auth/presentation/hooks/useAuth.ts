import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../../store'
import { loginUser } from '../../application/usecase/login'
import { registerUser } from '../../application/usecase/register'
import { clearAuthFeedback } from '../../store/auth.slice'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { status, error } = useSelector((state: RootState) => state.auth)

  return {
    status,
    error,
    login: (credentials: Parameters<typeof loginUser>[0]) => dispatch(loginUser(credentials)),
    register: (credentials: Parameters<typeof registerUser>[0]) => dispatch(registerUser(credentials)),
    clearFeedback: () => dispatch(clearAuthFeedback()),
  }
}
