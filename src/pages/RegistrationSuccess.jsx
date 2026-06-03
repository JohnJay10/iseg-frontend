import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { registrationService, paymentService } from '../services/api'
import { sendRegistrationConfirmationEmail } from '../services/emailService'
import './Registration.css'

const RegistrationSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [emailSent, setEmailSent] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [verificationError, setVerificationError] = useState('')
  const verifyingRef = useRef(false)
  const emailSentRef = useRef(false)

  useEffect(() => {
    // Extract params at the start of effect to ensure they're consistent throughout
    const txRef = searchParams.get('tx_ref')
    const registrationId = searchParams.get('registrationId')
    const status = searchParams.get('status')
    
    console.log('RegistrationSuccess effect triggered with:', { txRef, registrationId, status })

    // Prevent duplicate verification calls
    if (verifyingRef.current) {
      console.log('Verification already in progress, skipping...')
      return
    }

    // Case 1: Payment verification from Flutterwave (tx_ref present)
    if (txRef && !registrationId) {
      // Check if this payment was already verified in this session
      const verifiedInSession = sessionStorage.getItem(`verified_${txRef}`)
      if (verifiedInSession) {
        console.log('Payment already verified in this session:', txRef)
        setVerifying(false)
        return
      }
      
      verifyingRef.current = true
      
      const verifyFlutterwavePayment = async () => {
        try {
          setVerifying(true)
          console.log('Starting payment verification for tx_ref:', txRef)
          
          // Mark as verified immediately to prevent any duplicate calls
          sessionStorage.setItem(`verified_${txRef}`, 'true')
          
          // Retrieve pending registration data from localStorage
          const pendingData = localStorage.getItem('pendingRegistration')
          if (!pendingData) {
            throw new Error('Registration data not found. Please try again.')
          }

          const { registrationData, amount } = JSON.parse(pendingData)
          console.log('Retrieved registration data from localStorage')
          console.log('Amount from localStorage:', amount)

          // Verify payment with backend with timeout
          console.log('Calling verification API with tx_ref:', txRef, 'amount:', amount)
          
          // Create timeout promise
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => {
              reject(new Error('Payment verification timed out after 40 seconds. Please check your payment status and try again.'))
            }, 40000)
          )

          const verifyResponse = await Promise.race([
            paymentService.verifyPayment(txRef, registrationData, amount),
            timeoutPromise
          ])

          console.log('Verification response received:', verifyResponse.data)

          if (verifyResponse.data.success) {
            console.log('Payment verified successfully, registration saved')
            
            // Clear localStorage
            localStorage.removeItem('pendingRegistration')
            setVerifying(false)
            // Redirect to success page with registration ID
            const newRegId = verifyResponse.data.registrationId
            console.log('Redirecting to success page with registrationId:', newRegId)
            window.location.href = `/registration-success?registrationId=${newRegId}&status=completed`
            return
          } else {
            throw new Error(verifyResponse.data.message || 'Payment verification failed')
          }
        } catch (err) {
          console.error('Payment verification error:', err.message)
          console.error('Full error:', err)
          setVerificationError(err.message || 'An error occurred while verifying your payment')
          setVerifying(false)
        }
      }

      verifyFlutterwavePayment()
      return
    }

    // Case 2: Direct registration ID (already processed)
    if (!registrationId || status !== 'completed') {
      // If no registration ID or status isn't completed, redirect to registration
      const errorMessage = searchParams.get('error')
      if (errorMessage) {
        // If there's an error from payment, redirect to registration with error
        navigate(`/register?payment_error=${errorMessage}`, { replace: true })
      } else {
        navigate('/register', { replace: true })
      }
      return
    }

    // Mark as not verifying anymore (page reload completed)
    setVerifying(false)

    // Check if confirmation email was already sent for this registration
    if (emailSentRef.current) {
      console.log('Email already sent for registration:', registrationId)
      setEmailSent(true)
      return
    }

    // Fetch registration data and send confirmation email
    const sendConfirmationEmail = async () => {
      try {
        // Check if email was already sent in this session
        const emailSentSession = sessionStorage.getItem(`email_sent_${registrationId}`)
        if (emailSentSession) {
          console.log('Email already sent in this session for registration:', registrationId)
          emailSentRef.current = true
          setEmailSent(true)
          return
        }
        
        // Mark as being sent immediately to prevent duplicate sends
        emailSentRef.current = true
        setEmailSent(true)
        sessionStorage.setItem(`email_sent_${registrationId}`, 'true')
        
        console.log('Fetching registration details for email:', registrationId)
        const response = await registrationService.getRegistrationById(registrationId)
        const registrationData = response.data
        
        console.log('=== REGISTRATION FETCHED FROM DATABASE ===')
        console.log('Full registration data:', JSON.stringify(registrationData, null, 2))
        console.log('Total amount from database:', registrationData.totalAmount, '(type:', typeof registrationData.totalAmount + ')')

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
          selectedForums: registrationData.selectedForums || [],
          selectedShortCourses: registrationData.selectedShortCourses || [],
          selectedWorkshops: registrationData.selectedWorkshops || [],
          selectedSponsorship: registrationData.selectedSponsorship || [],
          independentSafari: registrationData.independentSafari || false,
          independentFestival: registrationData.independentFestival || false,
          ticketId: `REG-${registrationId}`,
        }

        console.log('Sending confirmation email to:', emailData.email)
        // Send email via EmailJS
        try {
          await sendRegistrationConfirmationEmail(emailData)
          console.log('Email sent via EmailJS successfully')
        } catch (emailErr) {
          console.error('EmailJS failed, trying backend email endpoint:', emailErr)
          // Fallback: Try backend email service
          try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
            const backendResponse = await axios.post(
              `${API_BASE_URL}/emails/send-registration-confirmation`,
              emailData
            )
            if (backendResponse.data.emailSent) {
              console.log('Email sent via backend successfully')
            } else {
              console.warn('Backend email service returned emailSent: false')
            }
          } catch (backendErr) {
            console.error('Backend email fallback also failed:', backendErr.message)
          }
        }
      } catch (err) {
        console.error('Error sending confirmation email:', err)
        console.error('Error details:', err.message, err.response?.data)
        // Don't redirect, email sending failure shouldn't prevent showing success page
      }
    }

    // Only send email if we have a registration ID and haven't sent yet
    if (registrationId && !emailSentRef.current) {
      console.log('Triggering email send for registration:', registrationId)
      sendConfirmationEmail()
    }
  }, [searchParams.toString()])

  const registrationId = searchParams.get('registrationId')
  const status = searchParams.get('status')
  const txRef = searchParams.get('tx_ref')

  // If verifying payment from Flutterwave, show loading state
  if (verifying || txRef) {
    return (
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Processing Payment...</h1>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="success-message">
              <div className="spinner"></div>
              <h2>Verifying your payment</h2>
              <p>Please wait while we confirm your payment and create your registration...</p>
              {verificationError && (
                <div style={{ color: '#d32f2f', marginTop: '1rem', padding: '1rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                  <strong>Error:</strong> {verificationError}
                  <br/>
                  <button
                    onClick={() => navigate('/register', { replace: true })}
                    style={{
                      marginTop: '1rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#d32f2f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Back to Registration
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    )
  }

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
            <p>Your registration for ISEG/GGSD-2026 Mega Symposium has been confirmed.</p>
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