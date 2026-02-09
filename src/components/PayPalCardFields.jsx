import { useState } from 'react'

const PayPalCardFields = ({ orderId, amount, registrationData, onSuccess, onError, onBack }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [processing, setProcessing] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Format card number (add spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '')
    value = value.replace(/[^0-9]/g, '')
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim()
    setCardNumber(formatted)
  }

  // Format expiry (MM/YY for display, but send as YYYY-MM to backend)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    setExpiry(value)
  }

  // Convert MM/YY display format to YYYY-MM for PayPal API
  const convertExpiryFormat = (displayExpiry) => {
    const [month, year] = displayExpiry.split('/')
    if (!month || !year) return null
    // Assume 20xx for years 00-99
    const fullYear = parseInt(year) < 100 ? `20${year}` : year
    return `${fullYear}-${month}`
  }

  // Format CVV (numbers only)
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setCvv(value)
  }

  const validateForm = () => {
    const errors = []

    // Validate card number (16 digits, remove spaces)
    const cardDigits = cardNumber.replace(/\s/g, '')
    if (cardDigits.length !== 16) {
      errors.push('Card number must be 16 digits')
    }

    // Validate expiry (MM/YY format)
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      errors.push('Expiry must be in MM/YY format')
    }

    // Validate that converted expiry is valid
    const convertedExpiry = convertExpiryFormat(expiry)
    if (!convertedExpiry) {
      errors.push('Invalid expiry date')
    }

    // Validate CVV (3-4 digits)
    if (cvv.length < 3 || cvv.length > 4) {
      errors.push('CVV must be 3 or 4 digits')
    }

    return errors
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    console.log('Payment submission started')

    const errors = validateForm()
    if (errors.length > 0) {
      const errorMsg = errors.join('\n')
      console.warn('Validation errors:', errorMsg)
      alert('Please fix the following errors:\n\n' + errorMsg)
      return
    }

    setProcessing(true)

    try {
      console.log('Submitting payment to backend...')
      const convertedExpiry = convertExpiryFormat(expiry)
      
      const captureResponse = await fetch(`${apiUrl}/payments/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiry: convertedExpiry, // Send as YYYY-MM format
          cvv: cvv,
        }),
      })

      if (!captureResponse.ok) {
        const errorData = await captureResponse.json()
        throw new Error(errorData.message || 'Payment processing failed')
      }

      const result = await captureResponse.json()
      console.log('✅ Payment processed successfully:', result)

      alert('Payment successful!\n\nYour registration is being confirmed. You will be redirected shortly.')

      setTimeout(() => {
        window.location.href = '/registration-success'
      }, 2000)
    } catch (error) {
      console.error('❌ Payment error:', error.message)
      onError(error)
      alert(`Payment failed: ${error.message}`)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="paypal-card-fields-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handlePayment}>
        {/* CARD NUMBER FIELD */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19"
            style={{
              width: '100%',
              border: '2px solid #ddd',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '16px',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              fontFamily: 'monospace',
            }}
            disabled={processing}
            required
          />
        </div>

        {/* EXPIRY & CVV - SIDE BY SIDE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              placeholder="12/26"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength="5"
              style={{
                width: '100%',
                border: '2px solid #ddd',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
                fontFamily: 'monospace',
              }}
              disabled={processing}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
              CVV
            </label>
            <input
              type="text"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
              maxLength="4"
              style={{
                width: '100%',
                border: '2px solid #ddd',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
                fontFamily: 'monospace',
              }}
              disabled={processing}
              required
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            disabled={processing}
            style={{
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: processing ? 'not-allowed' : 'pointer',
              opacity: processing ? 0.7 : 1,
              backgroundColor: '#0070ba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            {processing ? '⏳ Processing...' : `💳 Pay $${amount}`}
          </button>

          <button
            type="button"
            disabled={processing}
            onClick={onBack}
            style={{
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: processing ? 'not-allowed' : 'pointer',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            Back
          </button>
        </div>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666' }}>
        🔒 Your card information is secure and will be transmitted securely
      </p>
      <p style={{ textAlign: 'center', marginTop: '8px', fontSize: '11px', color: '#999', fontStyle: 'italic' }}>
        🧪 TEST MODE - Using mock payment processing
      </p>
    </div>
  )
}

export default PayPalCardFields
