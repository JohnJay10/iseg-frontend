import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { paymentService } from '../services/api'
import './StripePaymentForm.css'

const StripePaymentForm = ({ totalAmount, registrationData, onPaymentSuccess, onBack }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError('Stripe is not loaded. Please refresh the page.')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Create Payment Intent on the backend
      const intentResponse = await paymentService.createPaymentIntent(
        totalAmount,
        registrationData,
        'registration'
      )

      if (!intentResponse.data.success) {
        setError(intentResponse.data.message || 'Failed to create payment intent')
        setIsProcessing(false)
        return
      }

      const { clientSecret, paymentIntentId } = intentResponse.data

      // Confirm payment with Stripe
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${registrationData.firstName} ${registrationData.lastName}`,
            email: registrationData.email,
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message)
        setIsProcessing(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment on backend and save registration
        const confirmResponse = await paymentService.confirmStripePayment(
          paymentIntentId,
          registrationData,
          totalAmount
        )

        if (confirmResponse.data.success) {
          onPaymentSuccess(confirmResponse.data.registrationId)
        } else {
          setError(confirmResponse.data.message || 'Failed to confirm payment')
          setIsProcessing(false)
        }
      } else {
        setError(`Payment status: ${paymentIntent.status}`)
        setIsProcessing(false)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || ''
      if (errorMsg && !err.isTimedOut) {
        setError(errorMsg)
      } else if (err.isTimedOut) {
        console.error('Request timed out - suppressed from UI')
      } else {
        setError('Payment processing failed. Please try again.')
      }
      console.error('Payment error:', err)
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  return (
    <div className="stripe-payment-form">
      <h2>Payment Details</h2>
      <p className="text-muted">Enter your card details to complete registration</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="payment-summary">
        <h3>Order Summary</h3>
        <div className="summary-item">
          <span>Total Amount:</span>
          <span className="price" style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
            ${totalAmount.toFixed(2)}
          </span>
        </div>
        {registrationData.selectedItems && registrationData.selectedItems.length > 0 && (
          <div className="summary-details" style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>Items:</strong></p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {registrationData.selectedItems.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.3rem' }}>
                  <span>{item.code || item.type}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={handlePaymentSubmit} className="payment-form" style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label>Card Details *</label>
          <div className="card-element-wrapper" style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <div className="security-note" style={{
          backgroundColor: '#e8f5e9',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          color: '#2e7d32',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>🔒</span>
          <p>Your payment is securely processed by Stripe</p>
        </div>

        <div className="form-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!stripe || isProcessing}
            style={{ flex: 1 }}
          >
            {isProcessing ? 'Processing Payment...' : `Pay $${totalAmount.toFixed(2)}`}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={onBack}
            disabled={isProcessing}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  )
}

export default StripePaymentForm
