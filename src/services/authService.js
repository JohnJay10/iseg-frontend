import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const authService = {
  // Admin login
  loginAdmin: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/auth/login`, {
        email,
        password,
      })
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token)
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin))
      }
      
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Admin register (for initial setup)
  registerAdmin: async (username, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/auth/register`, {
        username,
        email,
        password,
      })
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token)
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin))
      }
      
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Logout
  logoutAdmin: () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('adminToken')
  },

  // Get stored admin user
  getAdminUser: () => {
    const user = localStorage.getItem('adminUser')
    return user ? JSON.parse(user) : null
  },

  // Check if admin is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('adminToken')
  },

  // Get axios instance with auth header
  getAxiosInstance: () => {
    const token = authService.getToken()
    return axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  },
}

export default authService
