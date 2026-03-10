import api from '../lib/axios'

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  data: string // user name
  token: string
}

export const authService = {
  login: (data: LoginData) => api.post<LoginResponse>('/auth/login', data),
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('isLoggedIn')
  },
  getToken: () => localStorage.getItem('token'),
  getUser: () => localStorage.getItem('userName'),
  isLoggedIn: () => localStorage.getItem('isLoggedIn') === 'true',
}
