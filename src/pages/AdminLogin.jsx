import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAuthService } from '../services/api'
import './AdminLogin.css'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await adminAuthService.login(formData.email, formData.password)
      
      // Store token and user info in localStorage
      localStorage.setItem('adminToken', response.data.token)
      localStorage.setItem('adminUser', JSON.stringify(response.data.admin))

      // Redirect to admin dashboard
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Admin Login</h1>
          <p>ISEG/GGSD 2026 Mega Symposium - Admin Portal</p>
        </div>
      </section>

      <section className="login-section">
        <div className="login-container">
          <div className="login-box">
            <h2>Admin Login</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>

            <p className="login-footer">
              This portal is for authorized administrators only.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminLogin
