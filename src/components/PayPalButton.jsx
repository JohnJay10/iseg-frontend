import { useEffect, useRef, useState } from 'react'
import { paymentService } from '../services/api'

const PayPalButton = ({ amount, onError, registrationData }) => {
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const cardNumberContainer = useRef(null)
  const expiryContainer = useRef(null)
  const cvvContainer = useRef(null)
  const cardFieldsRef = useRef(null)

  useEffect(() => {
    // Load PayPal SDK with Card Fields
    const script = document.createElement('script')
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

    if (!clientId) {
      console.error('VITE_PAYPAL_CLIENT_ID not configured')
      onError(new Error('PayPal client ID not configured'))
      return
    }

    // Load ONLY Card Fields component (NOT buttons)
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&components=card-fields`
    script.async = true

    script.onload = () => {
      try {
        initCardFields()
      } catch (err) {
        console.error('Error initializing card fields:', err)
        onError(err)
      }
    }

    script.onerror = () => {
      const error = new Error('Failed to load PayPal SDK')
      console.error(error)
      onError(error)
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        try {
          document.body.removeChild(script)
        } catch (e) {
          // ignore
        }
      }
    }
  }, [onError])

  const initCardFields = async () => {
    if (!window.paypal) {
      const error = new Error('PayPal SDK not loaded')
      console.error(error)
      onError(error)
      return
    }

    try {
      // Create Card Fields - MINIMAL, NO BILLING ADDRESS
      cardFieldsRef.current = window.paypal.CardFields({
        fields: {
          cardNumber: {
            container: '#card-number-field',
            placeholder: 'Card Number',
          },
          expiry: {
            container: '#expiry-field',
            placeholder: 'MM/YY',
          },
          cvv: {
            container: '#cvv-field',
            placeholder: 'CVV',
          },
          // NO BILLING ADDRESS FIELD
        },
      })

      console.log('Card fields initialized successfully')
      setLoading(false)
    } catch (error) {
      console.error('Error initializing card fields:', error)
      onError(error)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!cardFieldsRef.current) {
      onError(new Error('Card fields not ready'))
      return
    }

    setProcessing(true)

    try {
      // Step 1: Create PayPal order
      console.log('Creating PayPal order...')
      const orderResponse = await paymentService.createPaymentOrder(
        amount,
        `ISEG/GGSD 2026 Registration - $${amount}`,
        registrationData
      )

      const orderId = orderResponse.data.orderId
      console.log('Order created:', orderId)

      // Step 2: Get card field state
      const fieldState = await cardFieldsRef.current.getState()

      if (!fieldState.isFormValid) {
        onError(new Error('Please fill in all card fields'))
        setProcessing(false)
        return
      }

      // Step 3: Request card token
      console.log('Tokenizing card...')
      const { token } = await cardFieldsRef.current.requestCardFieldsToken()

      if (!token) {
        onError(new Error('Failed to tokenize card'))
        setProcessing(false)
        return
      }

      console.log('Card tokenized successfully')

      // Step 4: Submit token to backend to capture payment
      console.log('Sending card token to backend...')
      const captureResponse = await fetch(`${import.meta.env.VITE_API_URL}/payments/capture-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          token: token,
        }),
      })

      if (!captureResponse.ok) {
        const errorData = await captureResponse.json()
        throw new Error(errorData.message || 'Payment capture failed')
      }

      const result = await captureResponse.json()
      console.log('Payment captured successfully:', result)

      alert(
        'Payment processed successfully!\n\nYour registration will be confirmed shortly.'
      )

      // Give webhook time to process
      setTimeout(() => {
        window.location.href = '/registration-success'
      }, 2000)
    } catch (error) {
      console.error('Payment error:', error)
      onError(error)
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading card payment form...</p>
      </div>
    )
  }

  return (
    <div className="paypal-card-fields-wrapper" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handlePayment}>
        {/* CARD NUMBER - PayPal hosted, secure field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Card Number
          </label>
          <div
            id="card-number-field"
            style={{
              border: '1px solid #ccc',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '16px',
            }}
          />
        </div>

        {/* EXPIRY & CVV - Side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Expiry (MM/YY)
            </label>
            <div
              id="expiry-field"
              style={{
                border: '1px solid #ccc',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              CVV
            </label>
            <div
              id="cvv-field"
              style={{
                border: '1px solid #ccc',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
          </div>
        </div>

        {/* NO BILLING ADDRESS - Just pay button */}
        <button
          type="submit"
          disabled={processing}
          className="btn btn-primary btn-lg"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: processing ? 'not-allowed' : 'pointer',
            opacity: processing ? 0.7 : 1,
          }}
        >
          {processing ? '⏳ Processing...' : `💳 Pay $${amount}`}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666' }}>
        🔒 Your payment information is secure and encrypted by PayPal
      </p>
    </div>
  )
}

export default PayPalButton
