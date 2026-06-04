import { useRef, useState } from 'react'
import { paymentService } from '../services/api'
import gisdadLogo from '../images/gisdad.png'
import './FlutterWavePayment.css'

const FlutterWavePayment = ({ amount, registrationData, paymentAccount, onPaymentSuccess, onPaymentError, onBack }) => {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const isInitializingRef = useRef(false)

  console.log('FlutterWavePayment component rendered with amount:', amount, '(type:', typeof amount + ')')

  // Initialize payment and redirect to Flutterwave hosted page
  const handlePayment = async () => {
    // Prevent double clicks
    if (isInitializingRef.current) return
    isInitializingRef.current = true

    setProcessing(true)
    setError('')

    console.log('=== FLUTTERWAVE PAYMENT INITIALIZATION ===')
    console.log(`Amount to send: ${amount} (type: ${typeof amount})`)
    console.log('Registration data:', JSON.stringify(registrationData, null, 2))

    try {
      // FIX 1: Derive paymentPurpose and pass it as the third argument
      const paymentPurpose = registrationData.shortCourse ? 'course' : 'registration'

      // FIX 2: Avoid double-wrapping paymentAccount — only spread it in if not
      // already present in registrationData, to keep the data shape predictable
      const enrichedData = {
        ...registrationData,
        paymentAccount, // explicit key wins over any existing spread value
      }

      const response = await paymentService.initializePayment(
        amount,
        enrichedData,
        paymentPurpose, // FIX 1: was computed but never forwarded before
      )

      if (response.data.success) {
        const { paymentLink, txRef } = response.data

        if (!paymentLink) {
          throw new Error('No payment link returned from server')
        }

        console.log('Payment initialized, redirecting to Flutterwave...')

        // Save registration data and amount to localStorage for verification after payment
        console.log('=== SAVING TO LOCALSTORAGE ===')
        console.log(`Amount to save: ${amount} (type: ${typeof amount})`)
        const pendingData = {
          registrationData: enrichedData,
          amount,
          txRef,
        }
        console.log('Pending registration object:', JSON.stringify(pendingData, null, 2))
        localStorage.setItem('pendingRegistration', JSON.stringify(pendingData))
        console.log('Saved to localStorage successfully')

        // Redirect to Flutterwave hosted payment page
        window.location.href = paymentLink
      } else {
        throw new Error(response.data.message || 'Failed to initialize payment')
      }
    } catch (err) {
      console.error('Payment initialization error:', err.message)
      let msg = err.response?.data?.message || err.message || ''
      
      // Suppress timeout errors
      if (err.isTimedOut || msg.includes('timeout')) {
        console.error('Request timed out - suppressed from UI')
        setProcessing(false)
        isInitializingRef.current = false
        onPaymentError(err)
        return
      }

      // Handle specific error cases
      if (!msg) {
        msg = 'Payment initialization failed'
      } else if (msg.includes('502') || msg.includes('Bad gateway')) {
        msg = 'Payment service is temporarily unavailable. Please wait a moment and try again.'
      } else if (msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND')) {
        msg = 'Unable to reach payment service. Please check your connection and try again.'
      }

      setError(msg)
      setProcessing(false)
      isInitializingRef.current = false
      onPaymentError(err)
    }
  }

  // Get payment description based on registration data
  const getPaymentDescription = () => {
    let description = ''
    if (registrationData.registrationType === 'part-a') description = 'Part A Only'
    else if (registrationData.registrationType === 'part-b') description = 'Part B Only'
    else if (registrationData.registrationType === 'both') description = 'Both Parts'
    else if (registrationData.registrationType === 'all') description = 'All-Inclusive'
    if (registrationData.shortCourse) description += ' + Short Course'
    if (registrationData.safariTour) description += ' + Safari Tour'
    return description
  }

  return (
    <div className="flutter-wave-payment-container">
      <div className="payment-card">
        <div className="payment-logo">
          <img src={gisdadLogo} alt="GISDAD Logo" />
        </div>

        <div className="payment-header">
          <h3>Complete Your Payment</h3>
          <p className="payment-method">Powered by Flutterwave</p>
        </div>

        <div className="payment-details">
          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">{`$${amount.toFixed(2)} USD`}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Registration:</span>
            <span className="detail-value">
              {registrationData.firstName} {registrationData.lastName}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{registrationData.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Package:</span>
            <span className="detail-value">{getPaymentDescription()}</span>
          </div>
        </div>

        <div className="payment-note">
          <p>Note: Payment is processed in USD. Nigerian users can pay via Bank Transfer or USSD.</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button
              type="button"
              className="btn-retry-link"
              onClick={() => {
                setError('')
                isInitializingRef.current = false
              }}
            >
              Try again
            </button>
          </div>
        )}

        <div className="payment-methods-info">
          <h4>Accepted Payment Methods:</h4>
          <ul className="methods-list">
            <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
            <li>Mobile Money</li>
            <li>USSD Banking</li>
            <li>Bank Transfer</li>
          </ul>
        </div>

        <div className="payment-actions">
          <button
            type="button"
            className="btn-pay"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <>
                <span className="spinner-small"></span>
                Redirecting to payment...
              </>
            ) : (
              `Pay $${amount.toFixed(2)} USD`
            )}
          </button>
          <button
            type="button"
            className="btn-back"
            onClick={onBack}
            disabled={processing}
          >
            Back
          </button>
        </div>

        <div className="security-info">
          <p>🔒 Your payment is secure and encrypted</p>
          <p>All transactions are processed securely via Flutterwave</p>
        </div>
      </div>
    </div>
  )
}

export default FlutterWavePayment