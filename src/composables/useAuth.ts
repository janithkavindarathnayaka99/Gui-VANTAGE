import { ref } from 'vue'

export interface AuthUser {
  fullName: string
  email: string
}

interface StoredUser extends AuthUser {
  passwordSalt: string
  passwordHash: string
}

const USERS_KEY = 'vantage_users'
const SESSION_KEY = 'vantage_session'
const currentUser = ref<AuthUser | null>(null)

const isStoredUser = (user: unknown): user is StoredUser =>
  typeof user === 'object' &&
  user !== null &&
  'fullName' in user &&
  typeof user.fullName === 'string' &&
  'email' in user &&
  typeof user.email === 'string' &&
  'passwordSalt' in user &&
  typeof user.passwordSalt === 'string' &&
  /^[a-f0-9]{32}$/i.test(user.passwordSalt) &&
  'passwordHash' in user &&
  typeof user.passwordHash === 'string' &&
  /^[a-f0-9]{64}$/i.test(user.passwordHash)

const readUsers = (): StoredUser[] => {
  const stored = localStorage.getItem(USERS_KEY)
  if (!stored) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(stored)
  } catch {
    throw new Error('Saved accounts could not be read. Clear this site’s stored data and try again.')
  }

  if (!Array.isArray(parsed) || !parsed.every(isStoredUser)) {
    throw new Error('Saved accounts are invalid. Clear this site’s stored data and try again.')
  }

  return parsed
}

const hashPassword = async (password: string, salt: ArrayBuffer): Promise<string> => {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Secure password hashing is unavailable in this browser context.')
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bytes = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 310_000 },
    key,
    256,
  )
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('')
}

const saveSession = (user: AuthUser) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  currentUser.value = user
}

export function useAuth() {
  const register = async (fullName: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const users = readUsers()

    if (users.some(user => user.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.')
    }

    const passwordSalt = new ArrayBuffer(16)
    crypto.getRandomValues(new Uint8Array(passwordSalt))
    const user: StoredUser = {
      fullName: fullName.trim(),
      email: normalizedEmail,
      passwordSalt: Array.from(new Uint8Array(passwordSalt), byte => byte.toString(16).padStart(2, '0')).join(''),
      passwordHash: await hashPassword(password, passwordSalt),
    }

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
    saveSession({ fullName: user.fullName, email: user.email })
  }

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const user = readUsers().find(account => account.email === normalizedEmail)

    const passwordSalt = new ArrayBuffer(16)
    if (user) {
      const saltBytes = new Uint8Array(passwordSalt)
      for (let index = 0; index < saltBytes.length; index++) {
        saltBytes[index] = Number.parseInt(user.passwordSalt.slice(index * 2, index * 2 + 2), 16)
      }
    }

    if (!user || user.passwordHash !== await hashPassword(password, passwordSalt)) {
      throw new Error('Email or password is incorrect.')
    }

    saveSession({ fullName: user.fullName, email: user.email })
  }

  const restoreSession = () => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (!stored) {
      currentUser.value = null
      return
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(stored)
    } catch {
      throw new Error('The saved sign-in session could not be read. Sign in again.')
    }

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !('fullName' in parsed) ||
      typeof parsed.fullName !== 'string' ||
      !('email' in parsed) ||
      typeof parsed.email !== 'string'
    ) {
      throw new Error('The saved sign-in session is invalid. Sign in again.')
    }

    currentUser.value = { fullName: parsed.fullName, email: parsed.email }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    currentUser.value = null
  }

  return { currentUser, register, login, restoreSession, logout }
}
