export function getRoleFromJwt(token: string): string | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) {
      return null
    }

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='))) as unknown

    if (typeof decoded !== 'object' || decoded === null || !('rol' in decoded)) {
      return null
    }

    return typeof decoded.rol === 'string' ? decoded.rol : null
  } catch {
    return null
  }
}
