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
  const [emailStatus, setEmailStatus] = useState('idle')
  const [emailError, setEmailError] = useState('')
  const [verifying, setVerifying] = useState(true)
  const [verificationError, setVerificationError] = useState('')
  const [registrationDetails, setRegistrationDetails] = useState(null)
  const [fetchingRegistration, setFetchingRegistration] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const verifyingRef = useRef(false)
  const emailSentRef = useRef(false)

  const sendConfirmationEmailViaBackend = async (emailData) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const response = await axios.post(
      `${API_BASE_URL}/emails/send-registration-confirmation`,
      emailData,
    )
    return response.data?.emailSent === true
  }

  const sendConfirmationEmailById = async (registrationId) => {
    try {
      const emailSentSession = sessionStorage.getItem(`email_sent_${registrationId}`)
      if (emailSentSession) {
        console.log('Email already sent in this session for registration:', registrationId)
        emailSentRef.current = true
        setEmailSent(true)
        setEmailStatus('sent')
        return
      }

      setEmailStatus('sending')
      setEmailError('')

      console.log('Fetching registration details for email:', registrationId)
      const response = await registrationService.getRegistrationById(registrationId)
      const registrationData = response.data

      console.log('=== REGISTRATION FETCHED FROM DATABASE ===')
      console.log('Full registration data:', JSON.stringify(registrationData, null, 2))
      console.log('Total amount from database:', registrationData.totalAmount, '(type:', typeof registrationData.totalAmount + ')')

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
      let emailSentSuccessfully = false

      try {
        console.log('Attempting backend email send first')
        emailSentSuccessfully = await sendConfirmationEmailViaBackend(emailData)
        if (emailSentSuccessfully) {
          console.log('Email sent via backend successfully')
        } else {
          console.warn('Backend email service returned emailSent false')
        }
      } catch (backendErr) {
        console.error('Backend email send failed:', backendErr.message || backendErr)
      }

      if (!emailSentSuccessfully) {
        try {
          console.log('Trying EmailJS browser send as fallback')
          emailSentSuccessfully = await sendRegistrationConfirmationEmail(emailData)
          if (!emailSentSuccessfully) {
            throw new Error('EmailJS send returned false')
          }
          console.log('Email sent via EmailJS successfully')
        } catch (emailErr) {
          console.error('EmailJS failed:', emailErr)
        }
      }

      if (emailSentSuccessfully) {
        emailSentRef.current = true
        sessionStorage.setItem(`email_sent_${registrationId}`, 'true')
        setEmailSent(true)
        setEmailStatus('sent')
      } else {
        throw new Error('Failed to send confirmation email')
      }
    } catch (err) {
      console.error('Error sending confirmation email:', err)
      console.error('Error details:', err.message, err.response?.data)
      setEmailStatus('failed')
      setEmailError(err.message || 'Unable to send confirmation email at this time.')
    }
  }

  useEffect(() => {
    // Extract params at the start of effect to ensure they're consistent throughout
    const txRef = searchParams.get('tx_ref')
    const sessionId = searchParams.get('session_id')
    const registrationId = searchParams.get('registrationId')
    const status = searchParams.get('status')
    
    console.log('RegistrationSuccess effect triggered with:', { txRef, sessionId, registrationId, status })

    // Prevent duplicate verification calls
    if (verifyingRef.current) {
      console.log('Verification already in progress, skipping...')
      return
    }

    // Case 0: Stripe Checkout Session (session_id present)
    if (sessionId && !registrationId) {
      // Check if this session was already verified in this session
      const verifiedInSession = sessionStorage.getItem(`verified_stripe_${sessionId}`)
      if (verifiedInSession) {
        console.log('Stripe session already verified in this session:', sessionId)
        setVerifying(false)
        return
      }
      
      verifyingRef.current = true
      
      const verifyStripeSession = async () => {
        try {
          setVerifying(true)
          console.log('Starting Stripe session verification for session_id:', sessionId)
          
          // Mark as verified immediately to prevent any duplicate calls
          sessionStorage.setItem(`verified_stripe_${sessionId}`, 'true')
          
          // Retrieve pending registration data from sessionStorage
          const pendingData = sessionStorage.getItem('pendingStripeRegistration')
          if (!pendingData) {
            throw new Error('Registration data not found. Please try again.')
          }

          const { registrationData, amount } = JSON.parse(pendingData)
          console.log('Retrieved Stripe registration data from sessionStorage')
          console.log('Amount from sessionStorage:', amount)

          // Verify session with backend
          console.log('Calling Stripe verification API with session_id:', sessionId, 'amount:', amount)
          
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => {
              reject(new Error('Payment verification timed out after 40 seconds. Please check your payment status and try again.'))
            }, 40000)
          )

          const verifyResponse = await Promise.race([
            paymentService.verifyCheckoutSession(sessionId, registrationData, amount),
            timeoutPromise
          ])

          console.log('Stripe verification response received:', verifyResponse.data)

          if (verifyResponse.data.success) {
            console.log('Stripe payment verified successfully, registration saved')
            
            // Clear sessionStorage
            sessionStorage.removeItem('pendingStripeRegistration')
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
          console.error('Stripe payment verification error:', err.message)
          console.error('Full error:', err)
          if (err.message && !err.isTimedOut) {
            setVerificationError(err.message || 'An error occurred while verifying your payment')
          }
          setVerifying(false)
        }
      }

      verifyStripeSession()
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
          // Only show error if there's a message (suppresses timeout errors)
          if (err.message && !err.isTimedOut) {
            setVerificationError(err.message || 'An error occurred while verifying your payment')
          } else if (err.isTimedOut) {
            console.error('Request timed out - suppressed from UI')
          }
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

    const fetchRegistrationDetails = async () => {
      if (!registrationId) return
      setFetchingRegistration(true)
      setFetchError('')

      try {
        console.log('Fetching registration details for page:', registrationId)
        const response = await registrationService.getRegistrationById(registrationId)
        setRegistrationDetails(response.data)
        console.log('Registration details loaded for success page')
      } catch (fetchErr) {
        console.error('Failed to fetch registration details:', fetchErr)
        setFetchError('Unable to load registration details. Please refresh or contact support.')
      } finally {
        setFetchingRegistration(false)
      }
    }

    // Always fetch registration details for display
    if (registrationId) {
      fetchRegistrationDetails()
      sendConfirmationEmailById(registrationId)
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

  // Show success if we have a registration ID and payment is complete
  if (!registrationId || (status && status !== 'completed')) {
    return null
  }

  const renderSelectedItems = () => {
    if (!registrationDetails?.selectedItems?.length) {
      return <p>No additional items selected.</p>
    }
    return (
      <ul style={{ textAlign: 'left', margin: '1rem auto', maxWidth: '500px' }}>
        {registrationDetails.selectedItems.map((item, idx) => (
          <li key={idx}>{item.type}{item.code ? ` (${item.code})` : ''}: ${item.price.toFixed(2)}</li>
        ))}
      </ul>
    )
  }

  const getProgramLabel = () => {
    const type = registrationDetails?.registrationType || registrationDetails?.registrationCategory
    if (!type) return 'the selected program'

    const mapping = {
      'full-registration': 'Full Registration',
      full: 'Full Registration',
      'part-a': 'Part A',
      'part-b': 'Part B',
      'part-a-b': 'Part A and B',
      'single-day': 'Single Day Registration',
      'oss-sponsor': 'OSS Sponsor',
      'oss-participant': 'OSS Participant',
      forums: 'Forum(s)',
      shortcourse: 'Short Course(s)',
      workshop: 'Workshop(s)',
      safari: 'Safari Tour',
      festival: 'Festival',
      independent: 'Independent Program',
      combined: 'Conference Package',
    }

    return mapping[type] || type.replace(/-/g, ' ')
  }

  const renderRegistrationSummary = () => {
    if (fetchingRegistration) {
      return <p>Loading your registration details...</p>
    }

    if (fetchError) {
      return <p style={{ color: '#d32f2f' }}>{fetchError}</p>
    }

    if (!registrationDetails) {
      return <p>Your registration has been completed successfully. Details are being retrieved.</p>
    }

    const registrationTypeLabel = getProgramLabel()

    return (
      <div className="registration-summary" style={{ textAlign: 'left', maxWidth: '650px', margin: '1rem auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Name:</strong> {registrationDetails.firstName} {registrationDetails.lastName}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Email:</strong> {registrationDetails.email}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Program:</strong> {registrationTypeLabel}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Total Paid:</strong> ${registrationDetails.totalAmount?.toFixed(2) ?? '0.00'}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Selected Items:</strong>
          {renderSelectedItems()}
        </div>
      </div>
    )
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
            <h2>Payment successful!</h2>
            <p>You have successfully registered for {getProgramLabel()}.</p>
            <p className="registration-details">
              <strong>Registration ID: {registrationId}</strong><br/>
              Your payment has been processed successfully. A confirmation email has been sent to your registered email address with your registration details and further information about the symposium.
            </p>

            {renderRegistrationSummary()}

            <p>Please check your email for:</p>
            <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
              <li>Registration confirmation number</li>
              <li>Event schedule and logistics</li>
              <li>Payment receipt</li>
              <li>Important dates and deadlines</li>
            </ul>
            
            <div style={{ marginTop: '1.5rem', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
              {emailStatus === 'sent' && registrationDetails?.email && (
                <div style={{
                  backgroundColor: '#e6ffed',
                  color: '#1a7f37',
                  border: '1px solid #a7f3d0',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}>
                  Confirmation email sent to <strong>{registrationDetails.email}</strong>.
                </div>
              )}

              {emailStatus === 'sending' && (
                <div style={{
                  backgroundColor: '#eff6ff',
                  color: '#1d4ed8',
                  border: '1px solid #bfdbfe',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}>
                  Sending confirmation email...
                </div>
              )}

              {emailStatus === 'failed' && (
                <div style={{
                  backgroundColor: '#fff1f2',
                  color: '#9f1239',
                  border: '1px solid #fecdd3',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}>
                  <strong>Email delivery failed.</strong>
                  <p style={{ margin: '0.5rem 0 0 0' }}>{emailError || 'Please try again later.'}</p>
                  <button
                    onClick={() => {
                      setEmailStatus('sending')
                      setEmailError('')
                      emailSentRef.current = false
                      if (registrationId) {
                        sendConfirmationEmailById(registrationId)
                      }
                    }}
                    style={{
                      marginTop: '0.75rem',
                      backgroundColor: '#9f1239',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.6rem 1rem',
                      cursor: 'pointer',
                    }}
                  >
                    Retry Email
                  </button>
                </div>
              )}
            </div>
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