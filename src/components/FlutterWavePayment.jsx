import { useRef, useState } from 'react'
import { paymentService } from '../services/api'
import gisdadLogo from '../images/gisdad.png'
import './FlutterWavePayment.css'

const FlutterWavePayment = ({ amount, registrationData, paymentAccount, onPaymentSuccess, onPaymentError, onBack }) => {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const isInitializingRef = useRef(false)

  // Initialize payment and redirect to Flutterwave hosted page
  const handlePayment = async () => {
    // Prevent double clicks
    if (isInitializingRef.current) return
    isInitializingRef.current = true

    setProcessing(true)
    setError('')

    // Check if amount exceeds Flutterwave limit
    if (amount > 5000) {
      const msg = 'Amount exceeds payment limit. Large sponsorships (over $5,000) must be arranged directly. Please contact sponsors@iseg.ac.ke'
      setError(msg)
      setProcessing(false)
      isInitializingRef.current = false
      onPaymentError(new Error(msg))
      return
    }

    console.log('Initializing Flutterwave payment...')

    try {
      // Call backend — this generates a FRESH tx_ref every time

      const paymentPurpose = registrationData.shortCourse
        ? 'course'
        : 'registration'

      const response = await paymentService.initializePayment(
        amount,
        { ...registrationData, paymentAccount }, // Include payment account
        'flutterwave'
      )

      if (response.data.success) {
        const { paymentLink } = response.data

        if (!paymentLink) {
          throw new Error('No payment link returned from server')
        }

        console.log('Payment initialized, redirecting to Flutterwave...')

        // ✅ Redirect to Flutterwave hosted payment page
        // This avoids the double-initialization conflict that caused
        // "transaction reference already exists with a different amount or currency"
        window.location.href = paymentLink
      } else {
        throw new Error(response.data.message || 'Failed to initialize payment')
      }
    } catch (err) {
      console.error('Payment initialization error:', err.message)
      let msg = err.response?.data?.message || err.message || 'Payment initialization failed'

      // Handle specific error cases
      if (msg.includes('exceeds Flutterwave transaction limit')) {
        msg = 'Amount exceeds payment limit (USD 5,000 max). For large sponsorships, please contact sponsors@iseg.ac.ke'
      } else if (msg.includes('502') || msg.includes('Bad gateway')) {
        msg = 'Payment service is temporarily unavailable. Please wait a moment and try again.'
      } else if (msg.includes('timeout')) {
        msg = 'Connection timeout. Please check your internet and try again.'
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
            <div style={{ flex: 1 }}>
              <span>{error}</span>
              {error.includes('exceeds payment limit') && (
                <div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#e67e22' }}>
                  <p style={{ margin: '0.5rem 0 0 0' }}>
                    📧 <a href="mailto:sponsors@iseg.ac.ke" style={{ color: '#e67e22', textDecoration: 'underline' }}>Contact our sponsorship team</a> to arrange payment for large sponsorships.
                  </p>
                </div>
              )}
            </div>
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