import { useEffect, useState } from 'react'
import { paymentService } from '../services/api'
import './FlutterWavePayment.css'

const FlutterWavePayment = ({ amount, registrationData, onPaymentSuccess, onPaymentError, onBack }) => {
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [paymentInitialized, setPaymentInitialized] = useState(false)

  // Load Flutterwave script
  useEffect(() => {
    const publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY

    if (!publicKey) {
      console.error('Flutterwave Public Key not configured')
      setError('Flutterwave configuration missing')
      onPaymentError(new Error('Missing VITE_FLUTTERWAVE_PUBLIC_KEY'))
      setLoading(false)
      return
    }

    // Check if Flutterwave script already exists
    if (window.FlutterwaveCheckout) {
      console.log('Flutterwave already loaded')
      setLoading(false)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.flutterwave.com/v3.js'
    script.async = true

    script.onload = () => {
      console.log('Flutterwave script loaded')
      setLoading(false)
    }

    script.onerror = () => {
      console.error('Failed to load Flutterwave script')
      setError('Failed to load payment gateway. Please refresh and try again.')
      onPaymentError(new Error('Failed to load Flutterwave script'))
      setLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      // Don't remove script - keep it for page lifespan
    }
  }, [onPaymentError])

  // Initialize payment
  const handlePayment = async () => {
    try {
      setProcessing(true)
      setError('')

      console.log('Initializing Flutterwave payment...')

      // Call backend to initialize payment
      const response = await paymentService.initializePayment(
        amount,
        registrationData,
        'flutterwave'
      )

      if (response.data.success) {
        const { txRef, data } = response.data

        console.log('Payment initialized, launching Flutterwave modal')

        // Launch Flutterwave payment modal
        window.FlutterwaveCheckout({
          public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
          tx_ref: txRef,
          amount: amount,
          currency: 'USD',
          payment_options: 'card,mobilemoney,ussd',
          customer: {
            email: registrationData.email,
            phonenumber: registrationData.phone,
            name: `${registrationData.firstName} ${registrationData.lastName}`,
          },
          customizations: {
            title: 'ISEG/GGSD 2026 Symposium Registration',
            description: getPaymentDescription(),
            logo: 'https://iseg.ac.ke/logo.png', // Update with your logo URL
          },
          callback: async (response) => {
            console.log('Payment response:', response)

            if (response.status === 'successful') {
              await verifyAndCompletePayment(txRef)
            } else {
              setError('Payment was not successful. Please try again.')
              setProcessing(false)
              onPaymentError(new Error('Payment failed'))
            }
          },
          onclose: () => {
            console.log('Payment modal closed')
            setProcessing(false)
            if (!paymentInitialized) {
              setError('Payment was cancelled')
            }
          },
        })

        setPaymentInitialized(true)
      } else {
        throw new Error(response.data.message || 'Failed to initialize payment')
      }
    } catch (err) {
      console.error('Payment initialization error:', err.message)
      const msg = err.response?.data?.message || err.message || 'Payment initialization failed'
      setError(msg)
      setProcessing(false)
      onPaymentError(err)
    }
  }

  // Verify payment and complete registration
  const verifyAndCompletePayment = async (txRef) => {
    try {
      console.log('Verifying payment...')

      const response = await paymentService.verifyPayment(txRef, registrationData, amount)

      if (response.data.success) {
        console.log('Payment verified successfully:', response.data.registrationId)
        setProcessing(false)
        onPaymentSuccess(response.data.registrationId)
      } else {
        throw new Error(response.data.message || 'Payment verification failed')
      }
    } catch (err) {
      console.error('Payment verification error:', err.message)
      const msg = err.response?.data?.message || err.message || 'Payment verification failed'
      setError(msg)
      setProcessing(false)
      onPaymentError(err)
    }
  }

  // Get payment description based on registration data
  const getPaymentDescription = () => {
    let description = ''

    if (registrationData.registrationType === 'part-a') {
      description = 'Part A Only'
    } else if (registrationData.registrationType === 'part-b') {
      description = 'Part B Only'
    } else if (registrationData.registrationType === 'both') {
      description = 'Both Parts'
    } else if (registrationData.registrationType === 'all') {
      description = 'All-Inclusive'
    }

    if (registrationData.shortCourse) {
      description += ' + Short Course'
    }

    if (registrationData.safariTour) {
      description += ' + Safari Tour'
    }

    return description
  }

  if (loading) {
    return (
      <div className="flutter-wave-payment-container">
        <div className="payment-loading">
          <div className="spinner"></div>
          <p>Loading payment gateway...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flutter-wave-payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h3>Complete Your Payment</h3>
          <p className="payment-method">Powered by Flutterwave</p>
        </div>

        <div className="payment-details">
          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">${amount.toFixed(2)} USD</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Registration:</span>
            <span className="detail-value">{registrationData.firstName} {registrationData.lastName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{registrationData.email}</span>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
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
            className="btn-pay"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <>
                <span className="spinner-small"></span>
                Processing...
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
          <button
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
