import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { registrationService } from '../services/api'
import { sendRegistrationConfirmationEmail } from '../services/emailService'
import './Registration.css'

const RegistrationSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Check if this is a successful return from Stripe
    const registrationId = searchParams.get('registrationId')
    const status = searchParams.get('status')

    if (!registrationId || status !== 'completed') {
      // If no registration ID or status isn't completed, redirect to registration
      const errorMessage = searchParams.get('error')
      if (errorMessage) {
        // If there's an error from Stripe, redirect to registration with error
        navigate(`/register?payment_error=${errorMessage}`, { replace: true })
      } else {
        navigate('/register', { replace: true })
      }
      return
    }

    // Fetch registration data and send confirmation email
    const sendConfirmationEmail = async () => {
      try {
        const response = await registrationService.getRegistrationById(registrationId)
        const registrationData = response.data

        // Prepare email data
        const emailData = {
          email: registrationData.email,
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          phone: registrationData.phone,
          registrationType: registrationData.registrationType,
          totalAmount: registrationData.totalAmount,
          shortCourse: registrationData.shortCourse,
          safariTour: registrationData.safariTour,
          ticketId: `REG-${registrationId}`,
        }

        // Send email via EmailJS
        await sendRegistrationConfirmationEmail(emailData)
        setEmailSent(true)
      } catch (err) {
        console.error('Error sending confirmation email:', err)
        // Don't redirect, email sending failure shouldn't prevent showing success page
        setEmailSent(true)
      }
    }

    if (!emailSent) {
      sendConfirmationEmail()
    }
  }, [searchParams, navigate, emailSent])

  const registrationId = searchParams.get('registrationId')
  const status = searchParams.get('status')

  // Show success only if we have registrationId and completed status
  if (!registrationId || status !== 'completed') {
    return null
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Registration Successful!</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Thank You for Registering!</h2>
            <p>Your registration for ISEG/GGSD 2026 Mega Symposium has been confirmed.</p>
            <p className="registration-details">
              <strong>Registration ID: {registrationId}</strong><br/>
              Your payment has been processed successfully. A confirmation email has been sent to your registered email address with your registration details and further information about the symposium.
            </p>
            <p>Please check your email for:</p>
            <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
              <li>Registration confirmation number</li>
              <li>Event schedule and logistics</li>
              <li>Payment receipt</li>
              <li>Important dates and deadlines</li>
            </ul>
            
            <div className="success-actions">
              <a href="/" className="btn btn-primary">Back to Home</a>
              <a href="/submit-abstract" className="btn btn-primary">Submit Abstract</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RegistrationSuccess