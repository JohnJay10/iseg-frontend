import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FlutterWavePayment from '../components/FlutterWavePayment'
import MultiSelectDropdown from './MultiSelectDropdown'
import { forumsList, shortCoursesList, workshopsList, sponsorshipList } from './RegistrationSelectors'
import './Registration.css'

const Registration = () => {
  const [error, setError] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [showSponsorshipTerms, setShowSponsorshipTerms] = useState(false)
  const [registrationData, setRegistrationData] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [paymentAccount, setPaymentAccount] = useState('kenya')
  const [registrationCategory, setRegistrationCategory] = useState('')
  const [includesFestivalFree, setIncludesFestivalFree] = useState(false)

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    affiliation: Yup.string().required('Affiliation is required'),
    country: Yup.string().required('Country is required'),
    agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      affiliation: '',
      country: '',
      registrationType: '',
      selectedForums: [],
      selectedShortCourses: [],
      selectedWorkshops: [],
      selectedSponsorship: [],
      independentSafari: false,
      independentFestival: false,
      agreeTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('')

      // Validate: At least one selection from any section
      const hasRegistrationType = values.registrationType !== ''
      const hasForums = values.selectedForums.length > 0
      const hasCourses = values.selectedShortCourses.length > 0
      const hasWorkshops = values.selectedWorkshops.length > 0
      const hasSponsorship = values.selectedSponsorship.length > 0
      const hasSafari = values.independentSafari
      const hasFestival = values.independentFestival

      if (!hasRegistrationType && !hasForums && !hasCourses && !hasWorkshops && !hasSponsorship && !hasSafari && !hasFestival) {
        setError('Please select at least one option from any section (Registration Type, Forums, Courses, Workshops, Sponsorship, Safari, or Festival)')
        return
      }

      // Calculate total price and determine payment account
      let total = 0
      let account = 'kenya'
      let category = ''
      let selectedItems = []

      // Full conference options
      if (values.registrationType === 'full-registration') {
        total = 750
        account = 'kenya'
        category = 'full'
        selectedItems.push({ type: 'Full Registration', price: 750, code: 'FULL' })
      } else if (values.registrationType === 'part-a') {
        total = 350
        account = 'kenya'
        category = 'part-a'
        selectedItems.push({ type: 'Part A Only', price: 350, code: 'PART-A' })
      } else if (values.registrationType === 'part-b') {
        total = 350
        account = 'kenya'
        category = 'part-b'
        selectedItems.push({ type: 'Part B Only', price: 350, code: 'PART-B' })
      } else if (values.registrationType === 'single-day') {
        total = 150
        account = 'kenya'
        category = 'single-day'
        selectedItems.push({ type: 'Single Day Registration', price: 150, code: 'SINGLE-DAY' })
      } else if (values.registrationType === 'part-a-b') {
        total = 600
        account = 'kenya'
        category = 'part-a-b'
        selectedItems.push({ type: 'Part A and B', price: 600, code: 'PART-AB' })
      } else if (values.registrationType === 'oss-sponsor') {
        total = 500
        account = 'kenya'
        category = 'oss-sponsor'
        selectedItems.push({ type: 'OSS Sponsor', price: 500, code: 'OSS-SPONSOR' })
      } else if (values.registrationType === 'oss-participant') {
        total = 250
        account = 'kenya'
        category = 'oss-participant'
        selectedItems.push({ type: 'OSS Participant', price: 250, code: 'OSS-PART' })
      }

      // Independent options - can be combined with main registration
      // Process forums
      if (hasForums) {
        values.selectedForums.forEach((forumCode) => {
          selectedItems.push({ type: 'Forum', price: 200, code: forumCode })
          total += 200
        })
      }

      // Process courses
      if (hasCourses) {
        values.selectedShortCourses.forEach((courseCode) => {
          selectedItems.push({ type: 'Short Course', price: 500, code: courseCode })
          total += 500
        })
      }

      // Process workshops
      if (hasWorkshops) {
        values.selectedWorkshops.forEach((workshopCode) => {
          const workshop = workshopsList.find(w => w.code === workshopCode)
          const price = workshop ? parseInt(workshop.fee.replace(/[^0-9]/g, '')) : 0
          selectedItems.push({ type: 'Workshop', price: price, code: workshopCode })
          total += price
        })
      }

      // Process safari
      if (hasSafari) {
        selectedItems.push({ type: 'Safari Tour', price: 400, code: 'SAFARI' })
        total += 400
      }

      // Process festival
      if (hasFestival) {
        // Festival is free for full conference/part registrants
        const isFestivalFree = ['full-registration', 'part-a', 'part-b', 'single-day', 'part-a-b'].includes(values.registrationType)
        const festivalPrice = isFestivalFree ? 0 : 30
        selectedItems.push({ type: 'Festival', price: festivalPrice, code: 'FESTIVAL' })
        total += festivalPrice
      }

      // Process sponsorship
      if (hasSponsorship) {
        values.selectedSponsorship.forEach((sponsorCode) => {
          const sponsor = sponsorshipList.find(s => s.code === sponsorCode)
          if (sponsor) {
            const price = parseInt(sponsor.fee.replace(/[^0-9]/g, '')) || 0
            selectedItems.push({ type: 'Sponsorship', price: price, code: sponsorCode })
            total += price
          }
        })
      }

      // Determine account routing and category
      if (hasRegistrationType) {
        // Has main registration type - always Kenya account
        account = 'kenya'
        if (hasForums || hasCourses || hasWorkshops || hasSafari || hasFestival || hasSponsorship) {
          category = 'combined'
        }
      } else {
        // No main registration type, only independent options - Nigeria account
        account = 'nigeria'
        category = 'independent'
      }

      // Store registration data
      setRegistrationData({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        affiliation: values.affiliation,
        country: values.country,
        registrationType: values.registrationType,
        selectedForums: values.selectedForums,
        selectedShortCourses: values.selectedShortCourses,
        selectedWorkshops: values.selectedWorkshops,
        selectedSponsorship: values.selectedSponsorship,
        independentSafari: values.independentSafari,
        independentFestival: values.independentFestival,
        selectedItems: selectedItems,
        registrationCategory: category,
      })
      setTotalAmount(total)
      setPaymentAccount(account)
      setShowPayment(true)
    },
  })

  const handlePaymentSuccess = (registrationId) => {
    window.location.href = `/registration-success?registrationId=${registrationId}&status=completed`
  }

  const handlePaymentError = (error) => {
    console.error('Payment error:', error)
    setError('Payment processing error. Please try again.')
  }

  const handleBackToForm = () => {
    setShowPayment(false)
    setRegistrationData(null)
    setTotalAmount(0)
    setPaymentAccount('kenya')
    setError('')
  }

  if (showPayment && registrationData) {
    return (
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Complete Your Payment</h1>
            <p>
              {paymentAccount === 'kenya' ? 'Kenyan Bank Account' : 'Nigerian Bank Account'}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <FlutterWavePayment
              amount={totalAmount}
              registrationData={registrationData}
              paymentAccount={paymentAccount}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              onBack={handleBackToForm}
            />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Register for ISEG/GGSD-2026</h1>
          <p>Select your registration type and complete your registration</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Registration Form */}
          <div className="registration-wrapper">
            <div className="registration-form-section">
              <form onSubmit={formik.handleSubmit} className="registration-form">
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
                      placeholder="University / Organization"
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
                      placeholder="Your Country"
                    />
                    {formik.touched.country && formik.errors.country && (
                      <span className="error">{formik.errors.country}</span>
                    )}
                  </div>
                </div>

                {/* Registration Type Selection */}
                <h3 style={{ marginTop: '2rem' }}>Select Registration Type *</h3>

                {/* Full Conference Registration */}
                <fieldset className="registration-group">
                  <legend>🏦 Mega-Symposium Registration (Kenya Account)</legend>

                  <div className="registration-options">
                    <label className="radio-group">
                      <input
                        type="radio"
                        name="registrationType"
                        value="full-registration"
                        checked={formik.values.registrationType === 'full-registration'}
                        onChange={() => formik.setFieldValue('registrationType', 'full-registration')}
                        onBlur={formik.handleBlur}
                      />
                      <span className="radio-label">Full Registration - $750</span>
                    </label>

                    <label className="radio-group">
                      <input
                        type="radio"
                        name="registrationType"
                        value="part-a"
                        checked={formik.values.registrationType === 'part-a'}
                        onChange={() => formik.setFieldValue('registrationType', 'part-a')}
                        onBlur={formik.handleBlur}
                      />
                      <span className="radio-label">Part A Only - $350</span>
                    </label>

                    <label className="radio-group">
                      <input
                        type="radio"
                        name="registrationType"
                        value="part-b"
                        checked={formik.values.registrationType === 'part-b'}
                        onChange={() => formik.setFieldValue('registrationType', 'part-b')}
                        onBlur={formik.handleBlur}
                      />
                      <span className="radio-label">Part B Only - $350</span>
                    </label>

                    <label className="radio-group">
                      <input
                        type="radio"
                        name="registrationType"
                        value="single-day"
                        checked={formik.values.registrationType === 'single-day'}
                        onChange={() => formik.setFieldValue('registrationType', 'single-day')}
                        onBlur={formik.handleBlur}
                      />
                      <span className="radio-label">Single Day Registration (Part A or B) - $150</span>
                    </label>

                    <label className="radio-group">
                      <input
                        type="radio"
                        name="registrationType"
                        value="part-a-b"
                        checked={formik.values.registrationType === 'part-a-b'}
                        onChange={() => formik.setFieldValue('registrationType', 'part-a-b')}
                        onBlur={formik.handleBlur}
                      />
                      <span className="radio-label">Part A and B - $600</span>
                    </label>
                  </div>
                </fieldset>

                {/* Independent Options - Multiple Selection */}
                <fieldset className="registration-group">
                  <legend>📍 Additional Optional Events (Select to Add) - Can be combined with main registration</legend>

                  <div className="registration-options">
                    {/* Forums Dropdown */}
                    <div className="independent-option">
                      <label className="checkbox-group">
                        <input
                          type="checkbox"
                          checked={formik.values.selectedForums.length > 0}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              formik.setFieldValue('selectedForums', [])
                            }
                          }}
                        />
                        <span className="label-text">
                          Forums - $200 each {formik.values.selectedForums.length > 0 && `(${formik.values.selectedForums.length} selected)`}
                        </span>
                      </label>

                      {formik.values.selectedForums.length >= 0 && (
                        <div className="dropdown-selector">
                          <MultiSelectDropdown
                            options={[
                              ...forumsList.technical,
                              ...forumsList.policy,
                              ...forumsList.special
                            ]}
                            selectedValues={formik.values.selectedForums}
                            onChange={(selected) => formik.setFieldValue('selectedForums', selected)}
                            placeholder="Select forums..."
                          />
                          {formik.values.selectedForums.length > 0 && (
                            <div className="selected-tags">
                              {formik.values.selectedForums.map((code) => (
                                <span key={code} className="tag">
                                  {code}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = formik.values.selectedForums.filter(f => f !== code)
                                      formik.setFieldValue('selectedForums', updated)
                                    }}
                                    className="tag-remove"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Short Courses Dropdown */}
                    <div className="independent-option">
                      <label className="checkbox-group">
                        <input
                          type="checkbox"
                          checked={formik.values.selectedShortCourses.length > 0}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              formik.setFieldValue('selectedShortCourses', [])
                            }
                          }}
                        />
                        <span className="label-text">
                          Short Courses - $500 each {formik.values.selectedShortCourses.length > 0 && `(${formik.values.selectedShortCourses.length} selected)`}
                        </span>
                      </label>

                      {formik.values.selectedShortCourses.length >= 0 && (
                        <div className="dropdown-selector">
                          <MultiSelectDropdown
                            options={[
                              ...shortCoursesList.technical,
                              ...shortCoursesList.policy
                            ]}
                            selectedValues={formik.values.selectedShortCourses}
                            onChange={(selected) => formik.setFieldValue('selectedShortCourses', selected)}
                            placeholder="Select courses..."
                          />
                          {formik.values.selectedShortCourses.length > 0 && (
                            <div className="selected-tags">
                              {formik.values.selectedShortCourses.map((code) => (
                                <span key={code} className="tag">
                                  {code}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = formik.values.selectedShortCourses.filter(c => c !== code)
                                      formik.setFieldValue('selectedShortCourses', updated)
                                    }}
                                    className="tag-remove"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Training Workshops Dropdown */}
                    <div className="independent-option">
                      <label className="checkbox-group">
                        <input
                          type="checkbox"
                          checked={formik.values.selectedWorkshops.length > 0}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              formik.setFieldValue('selectedWorkshops', [])
                            }
                          }}
                        />
                        <span className="label-text">
                          Training Workshops - TW.1 ($3,000) / TW.2 ($2,000) {formik.values.selectedWorkshops.length > 0 && `(${formik.values.selectedWorkshops.length} selected)`}
                        </span>
                      </label>

                      {formik.values.selectedWorkshops.length >= 0 && (
                        <div className="dropdown-selector">
                          <MultiSelectDropdown
                            options={workshopsList}
                            selectedValues={formik.values.selectedWorkshops}
                            onChange={(selected) => formik.setFieldValue('selectedWorkshops', selected)}
                            placeholder="Select workshops..."
                          />
                          {formik.values.selectedWorkshops.length > 0 && (
                            <div className="selected-tags">
                              {formik.values.selectedWorkshops.map((code) => (
                                <span key={code} className="tag">
                                  {code}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = formik.values.selectedWorkshops.filter(w => w !== code)
                                      formik.setFieldValue('selectedWorkshops', updated)
                                    }}
                                    className="tag-remove"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Safari Tour */}
                    <label className="checkbox-group">
                      <input
                        type="checkbox"
                        name="independentSafari"
                        checked={formik.values.independentSafari}
                        onChange={(e) => formik.setFieldValue('independentSafari', e.target.checked)}
                      />
                      <span className="label-text">Safari/Museum/Nairobi Tour - $400</span>
                    </label>

                    {/* Festival */}
                    <label className="checkbox-group">
                      <input
                        type="checkbox"
                        name="independentFestival"
                        checked={formik.values.independentFestival}
                        onChange={(e) => formik.setFieldValue('independentFestival', e.target.checked)}
                      />
                      <span className="label-text">Festival - $30 (Free for Part A/B registrants)</span>
                    </label>
                  </div>
                </fieldset>

                {/* Sponsorship Contribution Section */}
                <fieldset className="registration-group">
                  <legend>💰 Sponsorship Contribution</legend>

                  <div className="registration-options">
                    {/* Sponsorship Dropdown */}
                    <div className="independent-option">
                      <label className="checkbox-group">
                        <input
                          type="checkbox"
                          checked={formik.values.selectedSponsorship.length > 0}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              formik.setFieldValue('selectedSponsorship', [])
                            }
                          }}
                        />
                        <span className="label-text">
                          Sponsorship Contribution {formik.values.selectedSponsorship.length > 0 && `(${formik.values.selectedSponsorship.length} selected)`}
                        </span>
                      </label>

                      {formik.values.selectedSponsorship.length >= 0 && (
                        <div className="dropdown-selector">
                          <MultiSelectDropdown
                            options={sponsorshipList}
                            selectedValues={formik.values.selectedSponsorship}
                            onChange={(selected) => formik.setFieldValue('selectedSponsorship', selected)}
                            placeholder="Select sponsorship level..."
                          />
                          {formik.values.selectedSponsorship.length > 0 && (
                            <div className="selected-tags">
                              {formik.values.selectedSponsorship.map((code) => {
                                const sponsor = sponsorshipList.find(s => s.code === code)
                                return (
                                  <span key={code} className="tag">
                                    {sponsor?.title || code}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = formik.values.selectedSponsorship.filter(s => s !== code)
                                        formik.setFieldValue('selectedSponsorship', updated)
                                      }}
                                      className="tag-remove"
                                    >
                                      ×
                                    </button>
                                  </span>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Sponsorship Terms Info */}
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px', borderLeft: '4px solid #e67e22' }}>
                  <p style={{ margin: 0, color: '#333', fontSize: '14px' }}>
                    <strong>💡 Sponsorship Benefits & Terms:</strong> View our sponsorship packages details and benefits
                    <button
                      type="button"
                      onClick={() => setShowSponsorshipTerms(true)}
                      style={{
                        marginLeft: '0.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#e67e22',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: 0
                      }}
                    >
                      Learn More
                    </button>
                  </p>
                </div>

                {/* OSS Options */}
                <fieldset className="registration-group">
                  <legend>✨ Special Sessions (OSS) - Kenya Account</legend>

                  <div className="registration-options">
                    <label className="radio-group">
                      <input
                        type="radio"
                        name="registrationType"
                        value="oss-sponsor"
                        checked={formik.values.registrationType === 'oss-sponsor'}
                        onChange={() => formik.setFieldValue('registrationType', 'oss-sponsor')}
                        onBlur={formik.handleBlur}
                      />
                      <span className="radio-label">Sponsor OSS - $500</span>
                    </label>

                    <label className="radio-group">
                      <input
                        type="radio"
                        name="registrationType"
                        value="oss-participant"
                        checked={formik.values.registrationType === 'oss-participant'}
                        onChange={() => formik.setFieldValue('registrationType', 'oss-participant')}
                        onBlur={formik.handleBlur}
                      />
                      <span className="radio-label">Participate in OSS - $250</span>
                    </label>
                  </div>
                </fieldset>

                {/* Terms and Conditions */}
                <div className="form-group checkbox-group" style={{ marginTop: '2rem' }}>
                  <label>
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      {...formik.getFieldProps('agreeTerms')}
                    />
                    I agree to the terms and conditions *
                  </label>
                  {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                    <span className="error">{formik.errors.agreeTerms}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ marginTop: '2rem', width: '100%' }}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="registration-summary-section">
              <div className="summary-card">
                <h4>Registration Summary</h4>
                <div className="summary-content">
                  {formik.values.registrationType && (
                    <div>
                      <p>
                        <strong>Registration Option:</strong>
                      </p>
                      <p>
                        {formik.values.registrationType === 'full-registration' && 'Full Registration - $750'}
                        {formik.values.registrationType === 'part-a' && 'Part A Only - $350'}
                        {formik.values.registrationType === 'part-b' && 'Part B Only - $350'}
                        {formik.values.registrationType === 'single-day' && 'Single Day Registration - $150'}
                        {formik.values.registrationType === 'part-a-b' && 'Part A and B - $600'}
                        {formik.values.registrationType === 'oss-sponsor' && 'OSS Sponsor - $500'}
                        {formik.values.registrationType === 'oss-participant' && 'OSS Participant - $250'}
                      </p>
                    </div>
                  )}

                  {(formik.values.selectedForums.length > 0 ||
                    formik.values.selectedShortCourses.length > 0 ||
                    formik.values.selectedWorkshops.length > 0 ||
                    formik.values.independentSafari ||
                    formik.values.independentFestival) && (
                    <div style={{ marginTop: '1rem' }}>
                      <p>
                        <strong>Additional Options:</strong>
                      </p>
                      {formik.values.selectedForums.length > 0 && (
                        <p>
                          {formik.values.selectedForums.length} Forum(s): ${formik.values.selectedForums.length * 200}
                        </p>
                      )}
                      {formik.values.selectedShortCourses.length > 0 && (
                        <p>
                          {formik.values.selectedShortCourses.length} Course(s): ${formik.values.selectedShortCourses.length * 500}
                        </p>
                      )}
                      {formik.values.selectedWorkshops.length > 0 && (
                        <div>
                          <p>
                            <strong>Workshop(s):</strong>
                          </p>
                          {formik.values.selectedWorkshops.map((code) => {
                            const workshop = workshopsList.find(w => w.code === code)
                            return (
                              <p key={code} style={{ marginLeft: '1rem' }}>
                                {code}: {workshop?.fee || '$0'}
                              </p>
                            )
                          })}
                        </div>
                      )}
                      {formik.values.independentSafari && <p>Safari/Museum/Nairobi Tour: $400</p>}
                      {formik.values.independentFestival && (
                        <p>
                          Festival: {['full-registration', 'part-a', 'part-b', 'single-day', 'part-a-b'].includes(formik.values.registrationType) ? 'FREE' : '$30'}
                        </p>
                      )}
                      {formik.values.selectedSponsorship.length > 0 && (
                        <div>
                          <p>
                            <strong>Sponsorship:</strong>
                          </p>
                          {formik.values.selectedSponsorship.map((code) => {
                            const sponsor = sponsorshipList.find(s => s.code === code)
                            return (
                              <p key={code} style={{ marginLeft: '1rem' }}>
                                {sponsor?.title || code}: {sponsor?.fee || '$0'}
                              </p>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid #ddd', marginTop: '1rem', paddingTop: '1rem' }}>
                    <p>
                      <strong>Total Amount:</strong>
                      <span style={{ fontSize: '1.5rem', color: '#e67e22', marginLeft: '0.5rem' }}>
                        ${(() => {
                          let total = 0
                          
                          // Add main registration type if selected
                          if (formik.values.registrationType === 'full-registration') total += 750
                          else if (formik.values.registrationType === 'part-a') total += 350
                          else if (formik.values.registrationType === 'part-b') total += 350
                          else if (formik.values.registrationType === 'single-day') total += 150
                          else if (formik.values.registrationType === 'part-a-b') total += 600
                          else if (formik.values.registrationType === 'oss-sponsor') total += 500
                          else if (formik.values.registrationType === 'oss-participant') total += 250
                          
                          // Add independent options (can be combined with main type)
                          total += formik.values.selectedForums.length * 200
                          total += formik.values.selectedShortCourses.length * 500
                          
                          // Add workshops with correct pricing
                          formik.values.selectedWorkshops.forEach((workshopCode) => {
                            const workshop = workshopsList.find(w => w.code === workshopCode)
                            if (workshop) {
                              const price = parseInt(workshop.fee.replace(/[^0-9]/g, ''))
                              total += price
                            }
                          })
                          
                          if (formik.values.independentSafari) total += 400
                          
                          // Festival is free for full conference/part registrants
                          if (formik.values.independentFestival) {
                            const isFestivalFree = ['full-registration', 'part-a', 'part-b', 'single-day', 'part-a-b'].includes(formik.values.registrationType)
                            if (!isFestivalFree) total += 30
                          }

                          // Add sponsorship if selected
                          if (formik.values.selectedSponsorship.length > 0) {
                            formik.values.selectedSponsorship.forEach((sponsorCode) => {
                              const sponsor = sponsorshipList.find(s => s.code === sponsorCode)
                              if (sponsor) {
                                const price = parseInt(sponsor.fee.replace(/[^0-9]/g, '')) || 0
                                total += price
                              }
                            })
                          }
                          
                          return total
                        })()}
                      </span>
                    </p>

                    {(() => {
                      let total = 0
                      if (formik.values.registrationType === 'full-registration') total += 750
                      else if (formik.values.registrationType === 'part-a') total += 350
                      else if (formik.values.registrationType === 'part-b') total += 350
                      else if (formik.values.registrationType === 'single-day') total += 150
                      else if (formik.values.registrationType === 'part-a-b') total += 600
                      else if (formik.values.registrationType === 'oss-sponsor') total += 500
                      else if (formik.values.registrationType === 'oss-participant') total += 250
                      
                      total += formik.values.selectedForums.length * 200
                      total += formik.values.selectedShortCourses.length * 500
                      
                      formik.values.selectedWorkshops.forEach((workshopCode) => {
                        const workshop = workshopsList.find(w => w.code === workshopCode)
                        if (workshop) {
                          const price = parseInt(workshop.fee.replace(/[^0-9]/g, ''))
                          total += price
                        }
                      })
                      
                      if (formik.values.independentSafari) total += 400
                      
                      if (formik.values.independentFestival) {
                        const isFestivalFree = ['full-registration', 'part-a', 'part-b', 'single-day', 'part-a-b'].includes(formik.values.registrationType)
                        if (!isFestivalFree) total += 30
                      }

                      if (formik.values.selectedSponsorship.length > 0) {
                        formik.values.selectedSponsorship.forEach((sponsorCode) => {
                          const sponsor = sponsorshipList.find(s => s.code === sponsorCode)
                          if (sponsor) {
                            const price = parseInt(sponsor.fee.replace(/[^0-9]/g, '')) || 0
                            total += price
                          }
                        })
                      }

                      return total > 5000 ? (
                        <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#fff3cd', borderRadius: '6px', border: '1px solid #ffc107', color: '#856404' }}>
                          <p style={{ margin: 0, fontSize: '14px' }}>
                            <strong>⚠️ Payment Limit Notice:</strong> Amounts over USD 5,000 require direct arrangement. Please <a href="mailto:sponsors@iseg.ac.ke" style={{ color: '#856404', textDecoration: 'underline' }}>contact our sponsorship team</a> for large sponsorships.
                          </p>
                        </div>
                      ) : null
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Terms/Conditions Modal */}
      {showSponsorshipTerms && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '700px',
            maxHeight: '80vh',
            overflow: 'auto',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#333' }}>Sponsorship Benefits & Terms</h2>
              <button
                onClick={() => setShowSponsorshipTerms(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ color: '#555', lineHeight: '1.8', fontSize: '15px' }}>
              <h3 style={{ color: '#333', marginTop: 0 }}>💰 Platinum Sponsorship - $30,000</h3>
              <ul style={{ color: '#666', marginLeft: '1.5rem' }}>
                <li>10 complimentary registrations for your team</li>
                <li>Corporate logo on conference website, materials & signage</li>
                <li>Prominent booth at conference venue</li>
                <li>Opportunity for remarks during opening session</li>
                <li>Dedicated side session/workshop</li>
                <li>5 scholarship opportunities for participants</li>
              </ul>

              <h3 style={{ color: '#333' }}>🥇 Gold Sponsorship - $20,000</h3>
              <ul style={{ color: '#666', marginLeft: '1.5rem' }}>
                <li>5 complimentary registrations for your team</li>
                <li>Corporate logo on conference website & materials</li>
                <li>Opportunity for remarks during opening session</li>
                <li>3 scholarship opportunities for participants</li>
              </ul>

              <h3 style={{ color: '#333' }}>🥈 Silver Sponsorship - $10,000</h3>
              <ul style={{ color: '#666', marginLeft: '1.5rem' }}>
                <li>Corporate logo on conference materials</li>
                <li>2 scholarship opportunities for participants</li>
              </ul>

              <h3 style={{ color: '#333' }}>🥉 Bronze Sponsorship - $5,000</h3>
              <ul style={{ color: '#666', marginLeft: '1.5rem' }}>
                <li>Corporate logo on conference materials</li>
                <li>2 scholarship opportunities for participants</li>
              </ul>

              <h3 style={{ color: '#333' }}>General Support - Under $5,000</h3>
              <ul style={{ color: '#666', marginLeft: '1.5rem' }}>
                <li>Acknowledgment as a supporter</li>
                <li>3 complimentary participant passes</li>
              </ul>

              <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px', borderLeft: '4px solid #e67e22' }}>
                <p style={{ margin: 0, color: '#555' }}>
                  <strong>Terms:</strong> All sponsorship benefits are valid for the ISEG/GGSD 2026 symposium (August 9-15, 2026). Additional partnership opportunities are available. Contact <a href="mailto:sponsors@iseg.ac.ke" style={{ color: '#e67e22', textDecoration: 'none' }}>sponsors@iseg.ac.ke</a> for custom packages.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSponsorshipTerms(false)}
              style={{
                marginTop: '2rem',
                backgroundColor: '#e67e22',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Registration
