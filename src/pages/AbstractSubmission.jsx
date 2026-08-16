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
        const errorMsg = err.response?.data?.message || err.message || ''
        if (errorMsg) {
          setError(errorMsg)
        } else if (err.isTimedOut) {
          console.error('Request timed out - suppressed from UI')
        } else {
          setError('Error submitting abstract')
        }
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
              <p>Your abstract has been submitted successfully to the IMEG-GSD 2027 Mega Symposium.</p>
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
          <p>Submit a 4-page abstract for the IMEG-GSD 2027 Mega Symposium</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
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

            {/* Guidelines Section Below Form */}
            <div className="guidelines-container">
              <h3>Abstract Submission Guidelines</h3>
              
              <div className="guidelines-section">
                <h4>📋 Format Requirements</h4>
                <ul>
                  <li><strong>Page Limit:</strong> 4 pages maximum</li>
                  <li><strong>Paper Size:</strong> A4 (210 × 297 mm)</li>
                  <li><strong>Top & Bottom Margins:</strong> 2.5 cm</li>
                  <li><strong>Left & Right Margins:</strong> 2 cm</li>
                  <li><strong>Font:</strong> 12-point Times New Roman or Calibri</li>
                  <li><strong>Line Spacing:</strong> Single or 1.5</li>
                  <li><strong>File Format:</strong> PDF only (maximum 10 MB)</li>
                </ul>
              </div>

              <div className="guidelines-section">
                <h4>📝 Abstract Structure</h4>
                <ul>
                  <li><strong>Title:</strong> Clear, concise, and descriptive of your research</li>
                  <li><strong>Authors:</strong> List all authors with affiliations</li>
                  <li><strong>Keywords:</strong> 4-6 relevant keywords separated by commas</li>
                  <li><strong>Introduction:</strong> Brief background and research motivation</li>
                  <li><strong>Methods/Approach:</strong> Describe your methodology or approach</li>
                  <li><strong>Results/Findings:</strong> Present key results or conclusions</li>
                  <li><strong>Implications:</strong> Discuss significance and implications</li>
                  <li><strong>References:</strong> Cite relevant literature (optional but recommended)</li>
                </ul>
              </div>

              <div className="guidelines-section">
                <h4>✅ Submission Requirements</h4>
                <ul>
                  <li><strong>Originality:</strong> Abstracts must present original research or significant contributions</li>
                  <li><strong>Quality:</strong> Well-written and suitable for peer-review</li>
                  <li><strong>Track Selection:</strong> Choose the most appropriate Part A or Part B track</li>
                  <li><strong>Lead Author Contact:</strong> Full contact information required</li>
                  <li><strong>Language:</strong> English only</li>
                  <li><strong>No Plagiarism:</strong> All submissions must be original work</li>
                </ul>
              </div>
              
              <div className="guidelines-note" style={{ marginTop: '1.5rem' }}>
                <h4>📅 Important Dates & Timeline</h4>
                <p><strong>Call for Abstracts Released:</strong> October 10, 2025</p>
                <p><strong>Sponsored-Session Proposals:</strong> November 30, 2026</p>
                <p><strong>4-Page Abstract Submission Deadline:</strong> December 20, 2026</p>
                <p><strong>Full Symposium Program Release:</strong> December 25, 2026</p>
                <p><strong>Early Registration Deadline (Suggested):</strong> January 15, 2027</p>
                <p><strong>Regular Registration Closes:</strong> February 1, 2027</p>
                <p><strong>Hotel Booking Deadline:</strong> February 5, 2027</p>
                <p><strong>Symposium Dates:</strong> February 14-23, 2027</p>
                <p><strong>Notification of Acceptance:</strong> Within 4-6 weeks of submission</p>
              </div>
            </div>
        </div>
      </section>
    </main>
  )
}

export default AbstractSubmission
