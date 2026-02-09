import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { paymentService } from '../services/api'
import './Registration.css'

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  affiliation: Yup.string().required('Affiliation is required'),
  country: Yup.string().required('Country is required'),
  registrationType: Yup.string().required('Please select a registration type'),
  shortCourse: Yup.boolean(),
  shortCourseId: Yup.string().when('shortCourse', {
    is: true,
    then: (schema) => schema.required('Please select a short course'),
    otherwise: (schema) => schema.notRequired(),
  }),
  agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
})

const Registration = () => {
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      affiliation: '',
      country: '',
      registrationType: '',
      shortCourse: false,
      shortCourseId: '',
      safariTour: false,
      agreeTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('')
        setIsProcessing(true)

        // Calculate total amount in cents
        let total = 0
        if (values.registrationType === 'part-a' || values.registrationType === 'part-b') total = 35000
        if (values.registrationType === 'both') total = 60000
        if (values.registrationType === 'all') total = 140000
        if (values.shortCourse) total += 50000
        if (values.safariTour) total += 40000

        // Create Stripe Checkout Session
        const response = await paymentService.createCheckoutSession(total / 100, values)

        if (response.data.checkoutUrl) {
          // Redirect to Stripe Checkout
          window.location.href = response.data.checkoutUrl
        } else {
          setError('Failed to create checkout session')
          setIsProcessing(false)
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || 'Error processing registration'
        setError(errorMsg)
        console.error('Registration error:', err)
        setIsProcessing(false)
      }
    },
  })

  // Calculate total amount for display
  const calculateTotal = () => {
    let total = 0
    if (formik.values.registrationType === 'part-a' || formik.values.registrationType === 'part-b') total = 350
    if (formik.values.registrationType === 'both') total = 600
    if (formik.values.registrationType === 'all') total = 1400
    if (formik.values.shortCourse) total += 500
    if (formik.values.safariTour) total += 400
    return total
  }

  const handlePaymentSuccess = (registrationId) => {
    window.location.href = `/registration-success?registrationId=${registrationId}&status=completed`
  }

  const handleBackToForm = () => {
    setError('')
  }

  const displayTotal = calculateTotal()

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Register for ISEG/GGSD 2026</h1>
          <p>Secure your spot at the Mega Symposium</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Registration Form */}
          <div className="registration-wrapper">
              <div className="registration-form-section">
                <form onSubmit={formik.handleSubmit} className="registration-form">
                  {error && <div className="alert alert-danger">{error}</div>}

                  <h3>Participant Information</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        {...formik.getFieldProps('firstName')}
                        placeholder="John"
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <span className="error">{formik.errors.firstName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        {...formik.getFieldProps('lastName')}
                        placeholder="Doe"
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <span className="error">{formik.errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        {...formik.getFieldProps('email')}
                        placeholder="john@example.com"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <span className="error">{formik.errors.email}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        {...formik.getFieldProps('phone')}
                        placeholder="+1 (555) 123-4567"
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <span className="error">{formik.errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="affiliation">Institution/Organization *</label>
                      <input
                        type="text"
                        id="affiliation"
                        name="affiliation"
                        {...formik.getFieldProps('affiliation')}
                        placeholder="University or Company Name"
                      />
                      {formik.touched.affiliation && formik.errors.affiliation && (
                        <span className="error">{formik.errors.affiliation}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Country *</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        {...formik.getFieldProps('country')}
                        placeholder="United States"
                      />
                      {formik.touched.country && formik.errors.country && (
                        <span className="error">{formik.errors.country}</span>
                      )}
                    </div>
                  </div>

                  <hr />

                  <h3>Registration Package</h3>

                  <div className="registration-type-grid">
                    {[
                      { id: 'part-a', label: 'Part A Only', price: '$350', description: 'Aug 9-11: Environmental Geotechnology' },
                      { id: 'part-b', label: 'Part B Only', price: '$350', description: 'Aug 13-15: Sustainable Development' },
                      { id: 'both', label: 'Both Parts', price: '$600', description: 'Complete Symposium Experience' },
                      { id: 'all', label: 'All-Inclusive', price: '$1,400', description: 'With Safari & Short Courses' },
                    ].map(pkg => (
                      <label key={pkg.id} className="reg-type-card">
                        <input
                          type="radio"
                          name="registrationType"
                          value={pkg.id}
                          checked={formik.values.registrationType === pkg.id}
                          onChange={() => formik.setFieldValue('registrationType', pkg.id)}
                        />
                        <div className="card-content">
                          <div className="card-header">
                            <h4>{pkg.label}</h4>
                            <span className="price">{pkg.price}</span>
                          </div>
                          <p className="description">{pkg.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {formik.touched.registrationType && formik.errors.registrationType && (
                    <span className="error">{formik.errors.registrationType}</span>
                  )}

                  <div className="form-group short-courses">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="shortCourse"
                        checked={formik.values.shortCourse}
                        onChange={(e) => formik.setFieldValue('shortCourse', e.target.checked)}
                      />
                      <span>I want to register for a short course (Optional - $500)</span>
                    </label>

                    {formik.values.shortCourse && (
                      <div className="form-group">
                        <label htmlFor="shortCourseId">Select Short Course *</label>
                        <select
                          id="shortCourseId"
                          name="shortCourseId"
                          value={formik.values.shortCourseId}
                          onChange={(e) => formik.setFieldValue('shortCourseId', e.target.value)}
                        >
                          <option value="">Choose a short course</option>
                          <option value="geotechengi">Geotechnical Engineering Fundamentals</option>
                          <option value="remediation">Advanced Remediation Techniques</option>
                          <option value="climate">Climate Change & Environmental Geotechnics</option>
                          <option value="gis">GIS Applications in Geotechnology</option>
                        </select>
                        {formik.touched.shortCourseId && formik.errors.shortCourseId && (
                          <span className="error">{formik.errors.shortCourseId}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <hr />

                  <h3>Safari Tour (Optional)</h3>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="safariTour"
                      checked={formik.values.safariTour}
                      onChange={(e) => formik.setFieldValue('safariTour', e.target.checked)}
                    />
                    <span>Add Kenya Safari Tour - $400 (Nairobi National Park, Museum Visit, Lunch)</span>
                  </label>

                  <hr />

                  <div className="form-group">
                    <label className="checkbox terms-check">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formik.values.agreeTerms}
                        onChange={(e) => formik.setFieldValue('agreeTerms', e.target.checked)}
                      />
                      <span>
                        I agree to the <a href="#" target="_blank" rel="noopener noreferrer">terms and conditions</a> and <a href="#" target="_blank" rel="noopener noreferrer">privacy policy</a> *
                      </span>
                    </label>
                    {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                      <span className="error">{formik.errors.agreeTerms}</span>
                    )}
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={formik.isSubmitting || isProcessing}>
                      {isProcessing ? 'Redirecting to Payment...' : 'Proceed to Payment'}
                    </button>
                    <a href="/" className="btn btn-outline">Cancel</a>
                  </div>
                </form>
              </div>

              <div className="registration-summary">
                <h3>Order Summary</h3>
                
                {formik.values.registrationType && (
                  <div className="summary-section">
                    <h4>Registration Package</h4>
                    <div className="summary-item">
                      <span>
                        {formik.values.registrationType === 'part-a' && 'Part A Only'}
                        {formik.values.registrationType === 'part-b' && 'Part B Only'}
                        {formik.values.registrationType === 'both' && 'Both Parts'}
                        {formik.values.registrationType === 'all' && 'All-Inclusive'}
                      </span>
                      <span className="price">
                        {formik.values.registrationType === 'part-a' && '$350'}
                        {formik.values.registrationType === 'part-b' && '$350'}
                        {formik.values.registrationType === 'both' && '$600'}
                        {formik.values.registrationType === 'all' && '$1,400'}
                      </span>
                    </div>
                  </div>
                )}

                {formik.values.shortCourse && (
                  <div className="summary-section">
                    <h4>Add-ons</h4>
                    <div className="summary-item">
                      <span>Short Course</span>
                      <span className="price">$500</span>
                    </div>
                    {formik.values.safariTour && (
                      <div className="summary-item">
                        <span>Safari Tour</span>
                        <span className="price">$400</span>
                      </div>
                    )}
                  </div>
                )}

                {formik.values.safariTour && !formik.values.shortCourse && (
                  <div className="summary-section">
                    <h4>Add-ons</h4>
                    <div className="summary-item">
                      <span>Safari Tour</span>
                      <span className="price">$400</span>
                    </div>
                  </div>
                )}

                <div className="summary-total">
                  <div className="summary-item total">
                    <span>Total</span>
                    <span className="price">${displayTotal}</span>
                  </div>
                </div>

                <div className="accepted-payment">
                  <h4>Payment Method</h4>
                  <ul>
                    <li>✓ Credit Card (Visa, Mastercard, American Express)</li>
                    <li>✓ Debit Card</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </section>
    </main>
  )
}

export default Registration
