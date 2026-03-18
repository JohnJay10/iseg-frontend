import { useEffect, useState, useRef } from 'react'
import { paymentService } from '../services/api'
import './PayPalSmartButtons.css'

const PayPalSmartButtons = ({ amount, registrationData, onPaymentSuccess, onPaymentError, onBack }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const containerRef = useRef(null)

  // First effect: Load PayPal SDK script
  useEffect(() => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

    if (!clientId) {
      console.error('❌ PayPal Client ID not configured')
      setError('PayPal configuration missing')
      onPaymentError(new Error('Missing VITE_PAYPAL_CLIENT_ID'))
      setLoading(false)
      return
    }

    // Check if script already exists
    if (window.paypal) {
      console.log('✅ PayPal SDK already loaded globally')
      setSdkLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`
    script.async = true

    script.onload = () => {
      console.log('✅ PayPal SDK script loaded successfully')
      setSdkLoaded(true)
    }

    script.onerror = () => {
      console.error('❌ Failed to load PayPal SDK script')
      setError('Failed to load PayPal. Please refresh and try again.')
      onPaymentError(new Error('Failed to load PayPal SDK'))
      setLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      // Don't remove script - keep it for page lifespan
    }
  }, [onPaymentError])

  // Second effect: Initialize buttons once SDK is loaded
  useEffect(() => {
    if (!sdkLoaded) {
      console.log('⏳ Waiting for PayPal SDK to load...')
      return
    }

    if (!window.paypal) {
      console.error('❌ PayPal SDK loaded but window.paypal is undefined')
      setError('PayPal SDK initialization failed')
      onPaymentError(new Error('window.paypal undefined'))
      setLoading(false)
      return
    }

    // Verify container is in DOM
    const container = containerRef.current || document.getElementById('paypal-button-container')
    if (!container) {
      console.error('❌ Container not found in DOM')
      setError('Payment interface failed to load. Please refresh.')
      onPaymentError(new Error('Container not in DOM'))
      setLoading(false)
      return
    }

    console.log('✅ SDK loaded and container found, initializing PayPal buttons...')

    try {
      const buttonsComponent = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          height: 45,
        },

        createOrder: async (data) => {
          console.log('🔄 Creating PayPal order...')
          setProcessing(true)
          setError('')

          try {
            const response = await paymentService.createOrder(amount, registrationData)
            console.log('✅ Order created:', response.data.id)
            return response.data.id
          } catch (err) {
            console.error('❌ Error creating order:', err)
            const msg = err.response?.data?.message || 'Failed to create order'
            setError(msg)
            setProcessing(false)
            throw err
          }
        },

        onApprove: async (data) => {
          console.log('✅ Order approved by PayPal:', data.orderID)
          
          try {
            setProcessing(true)
            const response = await paymentService.captureOrder(data.orderID, registrationData)

            if (response.data.success) {
              console.log('✅ Payment captured! Registration ID:', response.data.registrationId)
              onPaymentSuccess(response.data.registrationId)
            } else {
              throw new Error(response.data.message || 'Capture failed')
            }
          } catch (err) {
            console.error('❌ Error capturing order:', err)
            const msg = err.response?.data?.message || err.message || 'Payment failed'
            setError(msg)
            onPaymentError(err)
            setProcessing(false)
          }
        },

        onError: (err) => {
          console.error('❌ PayPal error:', err)
          const msg = err?.message || 'Payment processing failed'
          setError(msg)
          onPaymentError(err)
          setProcessing(false)
        },

        onCancel: (data) => {
          console.log('⚠️ Payment cancelled by user')
          setError('Payment was cancelled')
          setProcessing(false)
        },
      })

      // Render buttons into container
      buttonsComponent.render('#paypal-button-container')
        .then(() => {
          console.log('✅ PayPal Smart Buttons rendered successfully')
          setLoading(false)
        })
        .catch((err) => {
          console.error('❌ Error rendering PayPal buttons:', err)
          setError('Failed to render payment button. Please refresh.')
          onPaymentError(err)
          setLoading(false)
        })
    } catch (err) {
      console.error('❌ Error initializing PayPal buttons:', err)
      setError('Failed to initialize payment button')
      onPaymentError(err)
      setLoading(false)
    }
  }, [sdkLoaded])

  return (
    <div className="paypal-smart-buttons-wrapper">
      {/* Container is always in DOM - never conditional */}
      <div id="paypal-button-container" ref={containerRef} style={{ minHeight: '60px', marginBottom: '20px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
            </div>
            <p style={{ color: '#666', margin: 0 }}>Loading PayPal payment button...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </div>

      <div className="payment-header">
        <h3>Complete Your Payment</h3>
        <p className="text-muted">Pay with PayPal or Credit Card (Guest Checkout Available)</p>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div className="payment-summary" style={{ marginBottom: '30px' }}>
        <h4>Order Summary</h4>
        <div className="summary-item">
          <span style={{ fontWeight: '500' }}>Amount to Pay:</span>
          <span style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#007bff' }}>
            ${amount.toFixed(2)}
          </span>
        </div>
        <div className="summary-item" style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
          <span>Registration: {registrationData?.firstName} {registrationData?.lastName}</span>
        </div>
      </div>

      <div className="payment-info">
        <p style={{ fontSize: '0.85em', color: '#666', marginBottom: '10px' }}>
          <strong>Payment Options:</strong>
        </p>
        <ul style={{ fontSize: '0.85em', color: '#666', marginLeft: '20px' }}>
          <li>✓ PayPal Account Login</li>
          <li>✓ Guest Checkout (Card)</li>
          <li>✓ Credit/Debit Card (Visa, Mastercard, Amex)</li>
        </ul>
      </div>

      {onBack && (
        <button
          onClick={onBack}
          disabled={processing}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: processing ? 'not-allowed' : 'pointer',
            opacity: processing ? 0.6 : 1,
          }}
        >
          Back to Registration
        </button>
      )}
    </div>
  )
}

export default PayPalSmartButtons
