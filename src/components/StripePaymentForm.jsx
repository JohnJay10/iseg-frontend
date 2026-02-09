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
      // Create Payment Intent
      const intentResponse = await paymentService.createPaymentIntent(
        totalAmount / 100, // Convert cents to dollars
        `ISEG/GGSD 2026 Registration - $${(totalAmount / 100).toFixed(2)}`,
        registrationData
      )

      const { clientSecret } = intentResponse.data

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
        const confirmResponse = await paymentService.confirmPayment(
          paymentIntent.id,
          {
            ...registrationData,
            totalAmount: totalAmount / 100,
          }
        )

        onPaymentSuccess(confirmResponse.data.registrationId)
      } else {
        setError(`Payment status: ${paymentIntent.status}`)
        setIsProcessing(false)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Payment processing failed'
      setError(errorMsg)
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
            ${(totalAmount / 100).toFixed(2)}
          </span>
        </div>
      </div>

      <form onSubmit={handlePaymentSubmit} className="payment-form" style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label>Card Details *</label>
          <div className="card-element-wrapper">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <div className="security-note">
          <p>🔒 Your payment is securely processed by Stripe</p>
        </div>

        <div className="form-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!stripe || isProcessing}
            style={{ flex: 1 }}
          >
            {isProcessing ? 'Processing Payment...' : 'Pay Now'}
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
