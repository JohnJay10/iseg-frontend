import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { adminDashboardService } from '../services/api'
import authService from '../services/authService'
import './AdminDashboard.css'

const AdminDashboard = () => {  
  const navigate = useNavigate()
  const [abstracts, setAbstracts] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [admin, setAdmin] = useState(null)
  const [exporting, setExporting] = useState({ excel: false, pdf: false })
  const [deleting, setDeleting] = useState(null)
  const [downloading, setDownloading] = useState(null)
  const [activeTab, setActiveTab] = useState('abstracts')
  const [currentPage, setCurrentPage] = useState({ abstracts: 1, registrations: 1 })
  const itemsPerPage = 5

  useEffect(() => {
    // Check if user is logged in
    const token = authService.getToken()
    const user = authService.getAdminUser()

    if (!token || !user) {
      navigate('/admin/login', { replace: true })
      return
    }

    setAdmin(user)
    fetchAbstracts()
    fetchRegistrations()
  }, [navigate])

  const fetchAbstracts = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await adminDashboardService.getAllAbstracts()
      setAbstracts(response.data.abstracts || [])
    } catch (err) {
      console.error('Error fetching abstracts:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Error fetching abstracts'
      setError(errorMessage)

      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        authService.logoutAdmin()
        navigate('/admin/login', { replace: true })
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    try {
      const response = await adminDashboardService.getAllRegistrations()
      setRegistrations(response.data.registrations || [])
    } catch (err) {
      console.error('Error fetching registrations:', err)
      if (err.response?.status === 401) {
        authService.logoutAdmin()
        navigate('/admin/login', { replace: true })
      }
    }
  }

  const handleLogout = () => {
    authService.logoutAdmin()
    navigate('/admin/login', { replace: true })
  }

  const handleDownloadAbstract = async (abstractId, fileName) => {
    try {
      setDownloading(abstractId)
      const downloadUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/admin/dashboard/abstracts/${abstractId}/download`
      
      const response = await fetch(downloadUrl)
      
      if (!response.ok) {
        throw new Error('unable_to_download')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName || 'abstract.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error downloading abstract:', err)
      Swal.fire(
        'Unable to Download',
        'We couldn\'t find this abstract file. It may have been deleted or was not uploaded.',
        'error'
      )
    } finally {
      setDownloading(null)
    }
  }

  const handleExportExcel = async () => {
    try {
      setExporting({ ...exporting, excel: true })
      const response = await adminDashboardService.exportToExcel()
      
      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'abstracts.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error exporting to Excel:', err)
      setError(err.response?.data?.message || 'Failed to export to Excel')
    } finally {
      setExporting({ ...exporting, excel: false })
    }
  }

  const handleExportPDF = async () => {
    try {
      setExporting({ ...exporting, pdf: true })
      const response = await adminDashboardService.exportToPDF()
      
      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'abstracts.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error exporting to PDF:', err)
      setError(err.response?.data?.message || 'Failed to export to PDF')
    } finally {
      setExporting({ ...exporting, pdf: false })
    }
  }

  const handleDelete = async (abstractId) => {
    const result = await Swal.fire({
      title: 'Delete Abstract?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) {
      return
    }

    try {
      setDeleting(abstractId)
      await adminDashboardService.deleteAbstract(abstractId)
      setAbstracts(abstracts.filter(a => a._id !== abstractId))
      setError('')
      Swal.fire(
        'Deleted!',
        'The abstract has been deleted successfully.',
        'success'
      )
    } catch (err) {
      console.error('Error deleting abstract:', err)
      const errorMsg = err.response?.data?.message || 'Failed to delete abstract'
      setError(errorMsg)
      Swal.fire(
        'Error!',
        errorMsg,
        'error'
      )
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteRegistration = async (registrationId) => {
    const result = await Swal.fire({
      title: 'Delete Registration?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) {
      return
    }

    try {
      setDeleting(registrationId)
      await adminDashboardService.deleteRegistration(registrationId)
      setRegistrations(registrations.filter(r => r._id !== registrationId))
      setError('')
      Swal.fire(
        'Deleted!',
        'The registration has been deleted successfully.',
        'success'
      )
    } catch (err) {
      console.error('Error deleting registration:', err)
      const errorMsg = err.response?.data?.message || 'Failed to delete registration'
      setError(errorMsg)
      Swal.fire(
        'Error!',
        errorMsg,
        'error'
      )
    } finally {
      setDeleting(null)
    }
  }

  return (
    <main>
      <section className="page-header">
        <div className="container header-top">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Abstract Submissions Management</p>
          </div>
          <div className="user-info">
            {admin && <span>Welcome, {admin.username}</span>}
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="section admin-dashboard">
        <div className="container">
          <div className="dashboard-tabs">
            <button
              className={`tab-button ${activeTab === 'abstracts' ? 'active' : ''}`}
              onClick={() => setActiveTab('abstracts')}
            >
              📄 Abstracts ({abstracts.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'registrations' ? 'active' : ''}`}
              onClick={() => setActiveTab('registrations')}
            >
              👥 Registrations ({registrations.length})
            </button>
          </div>

          {activeTab === 'abstracts' && (
            <>
          <div className="dashboard-header">
            <div>
              <h2>Abstract Submissions</h2>
              <p>Total Submissions: <strong>{abstracts.length}</strong></p>
            </div>
            <div className="export-buttons">
              <button
                className="btn btn-primary"
                onClick={handleExportExcel}
                disabled={exporting.excel || loading}
                title="Download abstracts list as Excel file"
              >
                {exporting.excel ? '⏳ Exporting...' : '📥 Export to Excel'}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleExportPDF}
                disabled={exporting.pdf || loading}
                title="Download abstracts list as PDF file"
              >
                {exporting.pdf ? '⏳ Exporting...' : '📄 Export to PDF'}
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {loading ? (
            <div className="loading">Loading abstracts...</div>
          ) : abstracts.length === 0 ? (
            <div className="alert alert-info">No abstracts submitted yet.</div>
          ) : (
            <>
            <div className="abstracts-table-wrapper">
              <table className="abstracts-table">
                <thead>
                  <tr>
                    <th>Submission ID</th>
                    <th>Title</th>
                    <th>Authors</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Submitted Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {abstracts
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice((currentPage.abstracts - 1) * itemsPerPage, currentPage.abstracts * itemsPerPage)
                    .map((abstract) => (
                    <tr key={abstract._id}>
                      <td className="submission-id">
                        <strong>{abstract.submissionId}</strong>
                      </td>
                      <td className="title">
                        <span title={abstract.title}>
                          {abstract.title}
                        </span>
                      </td>
                      <td className="authors">
                        <span title={abstract.authors}>
                          {abstract.authors}
                        </span>
                      </td>
                      <td className="email">
                        <a href={`mailto:${abstract.email}`}>{abstract.email}</a>
                      </td>
                      <td>
                        <span className={`status-badge status-${abstract.status}`}>
                          {abstract.status}
                        </span>
                      </td>
                      <td className="date">
                        {new Date(abstract.createdAt).toLocaleDateString()}
                      </td>
                      <td className="actions">
                        <button
                          className="btn-icon btn-icon-download"
                          onClick={() => handleDownloadAbstract(abstract._id, abstract.fileName)}
                          disabled={downloading === abstract._id}
                          title="Download PDF"
                        >
                          {downloading === abstract._id ? '⏳' : '⬇️'}
                        </button>
                        <button
                          className="btn-icon btn-icon-delete"
                          onClick={() => handleDelete(abstract._id)}
                          disabled={deleting === abstract._id}
                          title="Delete abstract"
                        >
                          {deleting === abstract._id ? '⏳' : '🗑️'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              {Array.from({ length: Math.ceil(abstracts.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`paginator-btn ${currentPage.abstracts === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage({ ...currentPage, abstracts: page })}
                >
                  {page}
                </button>
              ))}
            </div>
            </>
          )}
            </>
          )}

          {activeTab === 'registrations' && (
            <>
          <div className="dashboard-header">
            <div>
              <h2>Registrations</h2>
              <p>Total Registrations: <strong>{registrations.length}</strong></p>
            </div>
          </div>

          {registrations.length === 0 ? (
            <div className="alert alert-info">No registrations yet.</div>
          ) : (
            <>
              <div className="abstracts-table-wrapper">
                <table className="abstracts-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Part A</th>
                      <th>Part B</th>
                      <th>Both Parts</th>
                      <th>Short Course</th>
                      <th>Safari Tour</th>
                      <th>Total Amount</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice((currentPage.registrations - 1) * itemsPerPage, currentPage.registrations * itemsPerPage)
                      .map((registration) => (
                      <tr key={registration._id}>
                        <td>
                          <strong>{registration.firstName} {registration.lastName}</strong>
                        </td>
                        <td className="email">
                          <a href={`mailto:${registration.email}`}>{registration.email}</a>
                        </td>
                        <td>
                          <span>{registration.registrationType === 'part-a' ? '✓ Yes' : '✗ No'}</span>
                        </td>
                        <td>
                          <span>{registration.registrationType === 'part-b' ? '✓ Yes' : '✗ No'}</span>
                        </td>
                        <td>
                          <span>{registration.registrationType === 'both' ? '✓ Yes' : '✗ No'}</span>
                        </td>
                        <td>
                          <span>{registration.shortCourse ? '✓ Yes' : '✗ No'}</span>
                        </td>
                        <td>
                          <span>{registration.safariTour ? '✓ Yes' : '✗ No'}</span>
                        </td>
                        <td>
                          <strong>${registration.totalAmount || 0}</strong>
                        </td>
                        <td className="date">
                          {new Date(registration.createdAt).toLocaleDateString()}
                        </td>
                        <td className="actions">
                          <button
                            className="btn-icon btn-icon-delete"
                            onClick={() => handleDeleteRegistration(registration._id)}
                            disabled={deleting === registration._id}
                            title="Delete registration"
                          >
                            {deleting === registration._id ? '⏳' : '🗑️'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                {Array.from({ length: Math.ceil(registrations.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`paginator-btn ${currentPage.registrations === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage({ ...currentPage, registrations: page })}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </>
          )}
            </>
          )}
        </div>


      </section>
    </main>
  )
}

export default AdminDashboard
