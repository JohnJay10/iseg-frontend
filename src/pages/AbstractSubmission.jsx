import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { abstractService } from '../services/api'
import { sendAbstractConfirmationEmail } from '../services/emailService'
import './AbstractSubmission.css'

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(10, 'Title must be at least 10 characters'),
  authors: Yup.string().required('Authors are required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  affiliation: Yup.string().required('Affiliation is required'),
  keywords: Yup.string().required('Keywords are required'),
  track: Yup.string().required('Please select a track'),
  file: Yup.mixed().required('Please upload your 4-page abstract PDF'),
})

const AbstractSubmission = () => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submissionId, setSubmissionId] = useState('')

  const formik = useFormik({
    initialValues: {
      title: '',
      authors: '',
      email: '',
      phone: '',
      affiliation: '',
      keywords: '',
      track: '',
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('')
        const formData = new FormData()
        Object.keys(values).forEach(key => {
          formData.append(key, values[key])
        })

        const response = await abstractService.submitAbstract(formData)
        const submittedId = response.data.submissionId
        
        // Send confirmation email via EmailJS
        await sendAbstractConfirmationEmail(values.email, submittedId, values.title)
        
        setSubmissionId(submittedId)
        setSubmitted(true)
        formik.resetForm()
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || 'Error submitting abstract'
        setError(errorMsg)
      }
    },
  })

  const handleFileChange = (e) => {
    formik.setFieldValue('file', e.currentTarget.files[0])
  }

  if (submitted) {
    return (
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Abstract Submitted Successfully</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>Thank You!</h2>
              <p>Your abstract has been submitted successfully to the ISEG/GGSD 2026 Mega Symposium.</p>
              <p className="submission-details">
                <strong>Submission ID:</strong> {submissionId}
              </p>
              <p>We will review your abstract and notify you of acceptance within 4-6 weeks.</p>
              <p>You can now proceed to register for the symposium.</p>
              
              <div className="success-actions">
                <a href="/register" className="btn btn-primary">Proceed to Registration</a>
                <a href="/" className="btn btn-primary">Back to Home</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Submit Your Abstract</h1>
          <p>Submit a 4-page abstract for the ISEG/GGSD 2026 Mega Symposium</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-container">
            <div className="form-info">
              <h3>Abstract Submission Guidelines</h3>
              <ul>
                <li><strong>Format:</strong> 4 pages maximum (PDF format)</li>
                <li><strong>Content:</strong> Include title, authors, keywords, and abstract text</li>
                <li><strong>Template:</strong> Follow the provided ISEG/GGSD template</li>
                <li><strong>Submission Deadline:</strong> March 30, 2026</li>
                <li><strong>Notification Date:</strong> May 30, 2026</li>
                <li><strong>Track Selection:</strong> Choose appropriate Part A or Part B track</li>
                <li><strong>Author Details:</strong> Include full contact information for lead author</li>
                <li><strong>Professional Writing:</strong> Ensure abstracts are well-written and peer-review ready</li>
                <li><strong>Novelty:</strong> Abstracts should present original research or significant contributions</li>
              </ul>
              
              <div className="guidelines-note" style={{ marginTop: '1.5rem' }}>
                <h4>📋 Important Dates</h4>
                <p><strong>Call for Abstracts Released:</strong> October 10, 2025</p>
                <p><strong>Abstract Submission Deadline:</strong> March 30, 2026</p>
                <p><strong>Program Published:</strong> May 30, 2026</p>
                <p><strong>Regular Registration Closes:</strong> June 30, 2026</p>
                <p><strong>Symposium Dates:</strong> August 9-15, 2026</p>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="submission-form">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="form-group">
                <label htmlFor="title">Paper Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  {...formik.getFieldProps('title')}
                  placeholder="Enter your paper title"
                />
                {formik.touched.title && formik.errors.title && (
                  <span className="error">{formik.errors.title}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="authors">Authors (comma separated) *</label>
                <input
                  type="text"
                  id="authors"
                  name="authors"
                  {...formik.getFieldProps('authors')}
                  placeholder="Author 1, Author 2, Author 3"
                />
                {formik.touched.authors && formik.errors.authors && (
                  <span className="error">{formik.errors.authors}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...formik.getFieldProps('email')}
                    placeholder="your@email.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="error">{formik.errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    {...formik.getFieldProps('phone')}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="affiliation">Affiliation/Institution *</label>
                <input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  {...formik.getFieldProps('affiliation')}
                  placeholder="University or Organization Name"
                />
                {formik.touched.affiliation && formik.errors.affiliation && (
                  <span className="error">{formik.errors.affiliation}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="track">Track/Topic Area *</label>
                <select
                  id="track"
                  name="track"
                  {...formik.getFieldProps('track')}
                >
                  <option value="">Select a track</option>
                  <optgroup label="Part A: Environmental Geotechnology">
                    <option value="modeling">Constitutive &amp; Numerical Modeling of Geomaterials</option>
                    <option value="failure">Failure Models, Deformation &amp; Excavation</option>
                    <option value="geohazards">Mechanics of Geohazards &amp; Ground Subsidence</option>
                    <option value="thermal">Thermal, Radiation &amp; Chemical Processes</option>
                    <option value="slopes">Geoslope Analyses, Geofabrics &amp; Stabilization</option>
                    <option value="mining">Mining, Rock Mechanics &amp; Minerals Processing</option>
                    <option value="geothermal">Geothermal Systems &amp; Energy Production</option>
                    <option value="characterization">Characterization &amp; Laboratory Methods</option>
                    <option value="ai">AI &amp; Robotics Applications</option>
                    <option value="geomonitoring">Innovative Geomonitoring &amp; Field Mapping</option>
                    <option value="climate">Geoenvironmental Aspects of Climate Change</option>
                    <option value="geohydrology">Geohydrology &amp; Contaminant Transport</option>
                    <option value="irrigation">Irrigation &amp; Conservation Agriculture</option>
                    <option value="waste">Waste Disposal &amp; Contaminant Systems</option>
                    <option value="geostructures">Design &amp; Construction of Geostructures</option>
                    <option value="remediation">Contaminated Site Remediation</option>
                    <option value="oilgas">Oil &amp; Gas Exploration Techniques</option>
                    <option value="stabilization">Soil Stabilization with Innovative Materials</option>
                    <option value="biotech">Biogeotechnology &amp; Analytical Systems</option>
                    <option value="landmine">Post-war Landmine Detection</option>
                    <option value="geochronology">Geochronology &amp; Isotopes Dating</option>
                    <option value="marine">Marine Geotechnics &amp; Mineral Exploration</option>
                    <option value="space">Lunar &amp; Martian Excavation Geotechnics</option>
                    <option value="geo-medical">Geo-medical, Geo-magnetic &amp; Geo-electrical Materials</option>
                  </optgroup>
                  <optgroup label="Part B: Global Geo-Ecosystems &amp; Sustainable Development">
                    <option value="sustainability">Sustainable Development &amp; Green Economy</option>
                    <option value="envlaws">Environmental Laws &amp; Global Treaties</option>
                    <option value="policy">Environmental Policy &amp; Regulatory Frameworks</option>
                    <option value="ecology">Ecological/Forestry Systems &amp; Blue Economy</option>
                    <option value="climate-change">Climate Change Mitigation &amp; Adaptation</option>
                    <option value="health">Contaminant Exposure &amp; Occupational Health</option>
                    <option value="energy">Energy Systems &amp; Environmental Sustainability</option>
                    <option value="agriculture">Agriculture &amp; Environmental Systems</option>
                    <option value="monitoring">Monitoring &amp; Visualization Systems</option>
                    <option value="sediments">Contaminated Sediments in Rivers &amp; Lakes</option>
                    <option value="recycling">Waste Recycling &amp; Wastewater Management</option>
                    <option value="pollution">Contaminant Pathways &amp; Noise Pollution</option>
                    <option value="disasters">Natural Disasters/Emergency Response</option>
                    <option value="water">Groundwater, Surface Water &amp; Air Pollution</option>
                    <option value="erosion">Soil Erosion &amp; Stabilization Management</option>
                    <option value="conflict">Land/Environmental Conflict Resolution</option>
                    <option value="mining-rehab">Mine Site Rehabilitation &amp; Tailings</option>
                    <option value="eia">Environmental Impact Assessments &amp; Auditing</option>
                    <option value="oilspills">Oil Spills Assessments &amp; Insurance</option>
                    <option value="education">Environmental Education &amp; Indigenous Knowledge</option>
                    <option value="diplomacy">Science Diplomacy for Environmental Resolution</option>
                    <option value="folklore">Environmental Folklore &amp; Poetry</option>
                    <option value="biotech">Environmental Biotechnology &amp; Restoration</option>
                    <option value="wildlife">Natural Resources &amp; Wildlife Management</option>
                  </optgroup>
                </select>
                {formik.touched.track && formik.errors.track && (
                  <span className="error">{formik.errors.track}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="keywords">Keywords (comma separated) *</label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  {...formik.getFieldProps('keywords')}
                  placeholder="keyword1, keyword2, keyword3"
                />
                {formik.touched.keywords && formik.errors.keywords && (
                  <span className="error">{formik.errors.keywords}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="file">Upload Abstract (PDF, max 10MB) *</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  {formik.values.file && (
                    <span className="file-label">
                      ✓ {formik.values.file.name}
                    </span>
                  )}
                </div>
                {formik.touched.file && formik.errors.file && (
                  <span className="error">{formik.errors.file}</span>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? 'Submitting...' : 'Submit Abstract'}
                </button>
                <a href="/" className="btn btn-primary">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AbstractSubmission
