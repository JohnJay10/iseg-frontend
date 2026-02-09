import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Add interceptor to include token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Abstract services
export const abstractService = {
  submitAbstract: (formData) => api.post('/abstracts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getAbstracts: () => api.get('/abstracts'),
  getAbstractById: (id) => api.get(`/abstracts/${id}`),
  getAbstractBySubmissionId: (submissionId) => api.get(`/abstracts/submission/${submissionId}`),
  updateAbstractStatus: (id, status) => api.put(`/abstracts/${id}/status`, { status }),
}

// Registration services
export const registrationService = {
  createRegistration: (data) => api.post('/registrations', data),
  getRegistrations: () => api.get('/registrations'),
  getRegistrationById: (id) => api.get(`/registrations/${id}`),
  getRegistrationByRegistrationId: (registrationId) => api.get(`/registrations/registration/${registrationId}`),
  updatePaymentStatus: (id, paymentStatus) => api.put(`/registrations/${id}/payment`, { paymentStatus }),
}

// Admin auth services
export const adminAuthService = {
  login: (email, password) => api.post('/admin/auth/login', { email, password }),
  register: (username, email, password) => api.post('/admin/auth/register', { username, email, password }),
}

// Admin dashboard services
export const adminDashboardService = {
  getAllAbstracts: () => api.get('/admin/dashboard/abstracts'),
  getAbstractDetails: (id) => api.get(`/admin/dashboard/abstracts/${id}`),
  exportToExcel: () => {
    const token = localStorage.getItem('adminToken')
    return axios.get(`${API_BASE_URL}/admin/dashboard/export/excel`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob',
    })
  },
  exportToPDF: () => {
    const token = localStorage.getItem('adminToken')
    return axios.get(`${API_BASE_URL}/admin/dashboard/export/pdf`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob',
    })
  },
  deleteAbstract: (id) => api.delete(`/admin/dashboard/abstracts/${id}`),
  getAllRegistrations: () => api.get('/admin/dashboard/registrations'),
  deleteRegistration: (id) => api.delete(`/admin/dashboard/registrations/${id}`),
  getRegistrations: () => api.get('/admin/dashboard/registrations'),
}

// Payment services
export const paymentService = {
  createCheckoutSession: (amount, registrationData) => 
    api.post('/payments/create-checkout', { amount, registrationData }),
}

export default api
