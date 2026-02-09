import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopHeader from './components/TopHeader'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import AbstractSubmission from './pages/AbstractSubmission'
import Registration from './pages/Registration'
import RegistrationSuccess from './pages/RegistrationSuccess'
import Schedule from './pages/Schedule'
import SafariTour from './pages/SafariTour'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <TopHeader />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit-abstract" element={<AbstractSubmission />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/safari-tour" element={<SafariTour />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
