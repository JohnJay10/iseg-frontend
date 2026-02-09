import { useState, useEffect } from 'react'
import Countdown from 'react-countdown'
import { Link } from 'react-router-dom'
import welcomeImage from '../images/welcome 1.png'
import banner1 from '../images/banner/banner_1.jpeg'
import banner2 from '../images/banner/banner_2.jpeg'
import banner3 from '../images/banner/banner_3.jpeg'
import './Home.css'

const CountdownRenderer = ({ days, hours, minutes, seconds }) => (
  <div className="countdown">
    <div className="countdown-item">
      <div className="countdown-value">{days}</div>
      <div className="countdown-label">DAYS</div>
    </div>
    <div className="countdown-item">
      <div className="countdown-value">{hours}</div>
      <div className="countdown-label">Hours</div>
    </div>
    <div className="countdown-item">
      <div className="countdown-value">{minutes}</div>
      <div className="countdown-label">Minutes</div>
    </div>
    <div className="countdown-item">
      <div className="countdown-value">{seconds}</div>
      <div className="countdown-label">Seconds</div>
    </div>
  </div>
)

const Home = () => {
  const eventDate = new Date('2026-08-09').getTime()
  const [currentSlide, setCurrentSlide] = useState(0)

  const bannerImages = [banner1, banner2, banner3]

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(slideTimer)
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        {/* Slideshow Background */}
        <div className="hero-slideshow">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        {/* Overlay and Content */}
        <div className="hero-overlay" />
        
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">14TH ISEG/GGSD <span className="title-highlight">MEGA SYMPOSIUM</span> 2026</h1>
            <p className="hero-subtitle">
              14th International Symposium on Environmental Geotechnology and Global Sustainable Development
              <br />
              in Conjunction with 2026 Global Ecosystems and Sustainable Development Symposium
            </p>
            
            <p className="event-details">
              <span>9-15 August 2026 @The University of Nairobi, Kenya</span>
            </p>
            
            <div className="hero-buttons">
              <Link to="/schedule" className="btn btn-secondary">VIEW SCHEDULE</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>

            <div className="video-section">
              <a href="https://www.youtube.com/watch?v=VhBl3dHT5SY" className="video-link" target="_blank" rel="noopener noreferrer">
                ▶ Watch Video
              </a>
            </div>
          </div>

          <div className="hero-cta">
            <Link to="/submit-abstract" className="btn-call-for-abstract">
              <span className="btn-label">SUBMIT</span>
              <span className="btn-main">ABSTRACT</span>
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Event Program Countdown - Overlays Hero */}
      <section className="event-countdown-overlay">
        <div className="container">
          <div className="countdown-card">
            <h2>Our Event Program Starts In :</h2>
            <Countdown date={eventDate} renderer={CountdownRenderer} />
            <Link to="/register" className="btn btn-primary">BOOK YOUR SPOT</Link>
          </div>
        </div>
      </section>

      {/* Welcome Section - Enhanced 2-Column Layout */}
      <section className="section welcome-enhanced">
        <div className="container">
          <div className="welcome-grid">
            {/* Left Column - Image */}
            <div className="welcome-image">
              <div className="image-placeholder">
                <img src={welcomeImage} alt="ISEG/GGSD 2026 Symposium" />
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="welcome-content">
              <h2>Welcome To The 14th ISEG/GGSD 2026 Symposium!</h2>
              <p className="lead">
                This expanded two-part ISEG/GGSD-2026 Mega Symposium is an outgrowth of 13 regular ISEG conferences/symposia which started in 1993, and many other forums with the continuing objective of applying technical and social science knowledge from a diversity of disciplines to address critical issues in sustainable development.
              </p>
              
              <div className="welcome-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🌍</span>
                  <div>
                    <h4>Global Network</h4>
                    <p>Connect with experts and professionals from around the world</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">📚</span>
                  <div>
                    <h4>Knowledge Exchange</h4>
                    <p>Two comprehensive parts covering geotechnology and sustainable development</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏆</span>
                  <div>
                    <h4>Distinguished Speakers</h4>
                    <p>Learn from leading experts and industry innovators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Announcement */}
      <section className="section light" id="announcements">
        <div className="container">
          <div className="bulletin-header">
            <h2>ISEG/GGSD-2026 MEGA SYMPOSIUM ANNOUNCEMENT – BULLETIN 2</h2>
            
            <div className="bulletin-info">
              <h4>14th International Symposium on Environmental Geotechnology and Global Sustainable Development</h4>
              <p>in conjunction with</p>
              <h4>2026 Global Geo-Ecosystems and Sustainable Development Symposium</h4>
              
              <div className="location-dates">
                <p><strong>University of Nairobi, Nairobi, Kenya</strong></p>
                <p><strong>Sunday, August 9, 2026 to Saturday August 15, 2026</strong></p>
              </div>
              
              <div className="organized-section">
                <h5>organized by</h5>
                <p>Global Institute of Sustainable Development, Advanced Analysis and Design (GISDAAD), Concord, NC, USA (Global headquarters) and Abuja, Nigeria.</p>
              </div>
              
              <div className="collaboration-section">
                <h5>in collaboration with</h5>
                <ul className="collaboration-list">
                  <li>The International Society of Environmental Geotechnology (ISEG), Nanjing, China.</li>
                  <li>International Center for Community Development (ICCD), Concord, NC, USA.</li>
                  <li>The African Academy of Sciences (AAS), Nairobi, Kenya.</li>
                  <li>Future Earth, South Africa.</li>
                  <li>Future Africa Institute, University of Pretoria, Pretoria, South Africa.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="announcement-section objectives-section">
            <h3>OBJECTIVES AND FOCUS OF THE TWO-PART MEGA SYMPOSIUM</h3>
            <p>This expanded two-part ISEG/GGSD-2026 Mega Symposium is an outgrowth of 13 regular ISEG conferences/symposia which started in 1993, and many other forums with the common objective of applying technical and social science knowledge from a diversity of disciplines to address critical issues in sustainable development and geoenvironmental engineering.</p>
          </div>

          <div className="two-part-layout parts-table">
            <div className="part-card">
              <div className="part-header part-a-header">
                <h4>Part A</h4>
              </div>
              <div className="part-content">
                <h4>ISEG/GGSD-2026 Mega Symposium Part A:</h4>
                <h5>14th International Symposium on Environmental Geotechnology and Global Sustainable Development</h5>
                <p>Part A will focus on fundamental aspects of Environmental Geotechnology to be treated by experts from various parts of the world such as researchers, practitioners, analysts, educators and engineers.</p>
                <div className="topics-container">
                  <div className="topics-column">
                    <ul className="topics-list">
                      <li>Constitutive and numerical modeling of geomaterials</li>
                      <li>Failure models of geomaterials</li>
                      <li>Mechanics of geohazards and ground subsidence</li>
                      <li>Thermal, radiation and chemical processes in geomaterials</li>
                      <li>Geoslope analyses, geofabrics and other stabilization methods</li>
                      <li>Mining, rock mechanics and minerals processing</li>
                      <li>Geothermal systems for energy production</li>
                      <li>Characterization and laboratory methods in geomaterials</li>
                      <li>AI and robotics applications in Environmental Geotechnology</li>
                    </ul>
                  </div>
                  <div className="topics-column">
                    <ul className="topics-list">
                      <li>Innovative geomonitoring and field mapping techniques</li>
                      <li>Geoenvironmental aspects of climate change</li>
                      <li>Geohydrology of water and contaminant transport</li>
                      <li>Waste disposal and contaminant systems in geomedia</li>
                      <li>Contaminated site remediation and waste containment</li>
                      <li>Soil stabilization with innovative materials</li>
                      <li>Biogeotechnology and related analytical support systems</li>
                      <li>Marine geotechnics and mineral exploration</li>
                      <li>And many more...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="part-card">
              <div className="part-header part-b-header">
                <h4>Part B</h4>
              </div>
              <div className="part-content">
                <h4>ISEG/GGSD-2026 Mega Symposium Part B:</h4>
                <h5>2026 Global Geo-Ecosystems and Sustainable Development Symposium</h5>
                <p>Part B brings together technical and social science knowledge across disciplines to address sustainable development and geoenvironmental issues in diverse socioeconomic sectors.</p>
                <div className="topics-container">
                  <div className="topics-column">
                    <ul className="topics-list">
                      <li>Elements of sustainable development and green economy</li>
                      <li>Environmental laws and global treaties</li>
                      <li>Environmental policy and regulatory frameworks</li>
                      <li>Ecological/forestry systems and blue economy</li>
                      <li>Climate change impacts mitigation and adaptation</li>
                      <li>Contaminant exposure and occupational health</li>
                      <li>Energy systems and environmental sustainability</li>
                      <li>Agriculture and environmental systems</li>
                      <li>Monitoring and visualization systems for risk assessment</li>
                    </ul>
                  </div>
                  <div className="topics-column">
                    <ul className="topics-list">
                      <li>Contaminated sediments in rivers and lakes</li>
                      <li>Waste recycling and wastewater management</li>
                      <li>Natural disasters/ emergency response systems</li>
                      <li>Groundwater, surface water and air pollution</li>
                      <li>Soil erosion and stabilization management</li>
                      <li>Environmental impact assessments and auditing</li>
                      <li>Environmental education and indigenous knowledge systems</li>
                      <li>Environmental biotechnology and restoration</li>
                      <li>And many more...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symposium Info Schedule */}
      <section className="section light symposium-schedule">
        <div className="container">
          <div className="schedule-header">
            <h2>Symposium Info Schedule</h2>
          </div>
          
          <div className="schedule-cards-grid">
            <div className="schedule-card">
              <div className="schedule-date">
                <span className="day">Day 1</span>
                <span className="date-text">Sunday, August 9, 2026</span>
              </div>
              <div className="schedule-content">
                <h4>Arrival of Participants</h4>
                <p>Begin your journey to the 14th ISEG/GGSD Mega Symposium with the arrival of participants from around the world.</p>
              </div>
            </div>

            <div className="schedule-card">
              <div className="schedule-date">
                <span className="day">Day 2</span>
                <span className="date-text">Monday, August 10, 2026</span>
              </div>
              <div className="schedule-content">
                <h4>ISEG Kickoff</h4>
                <p>On-Site Registration for Part A, Opening Ceremony, Keynote Presentations, Parallel Session Presentations, ISEG Council Meeting & Elections</p>
              </div>
            </div>

            <div className="schedule-card">
              <div className="schedule-date">
                <span className="day">Day 3</span>
                <span className="date-text">Tuesday, August 11, 2026</span>
              </div>
              <div className="schedule-content">
                <h4>Papers, Award & Dinner</h4>
                <p>Paper Presentations in Parallel Sessions, Poster Papers, ISEG Awards and Prizes, Part A Closing Dinner</p>
              </div>
            </div>
          </div>

          <div className="schedule-action">
            <Link to="/schedule" className="btn btn-primary">VIEW ALL DETAILS</Link>
          </div>
        </div>
      </section>

      {/* Registration Fees */}
      <section className="section fees-section">
        <div className="container">
          <div className="section-header">
            <h2>REGISTRATION FEES FOR ISEG/GGSD 2026 MEGA SYMPOSIUM</h2>
            <p>Choose the package that works best for you</p>
          </div>
          
          <div className="fees-cards-grid">
            <div className="fee-card">
              <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop" alt="Part A Registration" className="fee-image" />
              <div>
                <h3>Part A Registration</h3>
                <p className="fee-description">14th International Symposium on Environmental Geotechnology and Global Sustainable Development</p>
                <div className="fee-price">$350</div>
                <p className="fee-note">Per person</p>
              </div>
            </div>
            
            <div className="fee-card">
              <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop" alt="Part B Registration" className="fee-image" />
              <div>
                <h3>Part B Registration</h3>
                <p className="fee-description">2026 Global Geo-Ecosystems and Sustainable Development Symposium</p>
                <div className="fee-price">$350</div>
                <p className="fee-note">Per person</p>
              </div>
            </div>
            
            <div className="fee-card">
              <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=250&fit=crop" alt="Safari Tour" className="fee-image" />
              <div>
                <h3>Safari Tour</h3>
                <p className="fee-description">Nairobi National Park, Organized lunch, Nairobi Museum Visit</p>
                <div className="fee-price">$400</div>
                <p className="fee-note">Per person</p>
              </div>
            </div>
            
            <div className="fee-card">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop" alt="Short Courses" className="fee-image" />
              <div>
                <h3>Short Courses</h3>
                <p className="fee-description">International certified training programs</p>
                <div className="fee-price">$500</div>
                <p className="fee-note">Per course</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="section light why-attend-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Attend Our Symposium!</h2>
            <p>Join thousands of professionals and experts from around the world</p>
          </div>
          
          <div className="benefits-cards-grid">
            <div className="benefit-card-enhanced">
              <div className="benefit-icon">🤝</div>
              <h3>In Person Network</h3>
              <p>Opportunity to network with people across the globe in the symposium, tour and dinner night.</p>
            </div>
            <div className="benefit-card-enhanced">
              <div className="benefit-icon">💡</div>
              <h3>Boost Creativity</h3>
              <p>Learning new skills, strategies and gaining new insights into business expansion and creativity boosting.</p>
            </div>
            <div className="benefit-card-enhanced">
              <div className="benefit-icon">⭐</div>
              <h3>Top Speakers</h3>
              <p>Experts in different fields are invited as speakers across the world.</p>
            </div>
            <div className="benefit-card-enhanced">
              <div className="benefit-icon">🏆</div>
              <h3>International certified courses</h3>
              <p>The courses gives you access to internationally recognized certifications.</p>
            </div>
            <div className="benefit-card-enhanced">
              <div className="benefit-icon">💼</div>
              <h3>Potential Clients</h3>
              <p>Networking with people from all walks of life give you business continental access.</p>
            </div>
            <div className="benefit-card-enhanced safari-tour-card">
              <div className="benefit-icon">🦁</div>
              <h3>Kenya Safari Tour</h3>
              <p>Explore the beautiful nature of the Kenya Safari with other people from all walks of life.</p>
              <p className="safari-tour-description">Whether you're a wildlife lover, culture enthusiast, or history buff, Nairobi offers an unforgettable blend of natural beauty and rich heritage all in one vibrant city.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planning Calendar */}
      <section className="section calendar-section">
        <div className="container">
          <div className="section-header">
            <h2>MEGA SYMPOSIUM PLANNING CALENDAR</h2>
            <p>Important milestone dates</p>
          </div>
          
          <div className="calendar-timeline">
            <div className="calendar-item">
              <div className="calendar-date">Aug 30, 2025</div>
              <div className="calendar-label">Bulletin 2 Release</div>
            </div>
            
            <div className="calendar-item">
              <div className="calendar-date">Oct 10, 2025</div>
              <div className="calendar-label">Call for Abstracts</div>
            </div>
            
            <div className="calendar-item">
              <div className="calendar-date">Mar 30, 2026</div>
              <div className="calendar-label">Abstract Deadline</div>
            </div>
            
            <div className="calendar-item">
              <div className="calendar-date">May 30, 2026</div>
              <div className="calendar-label">Program Release</div>
            </div>
            
            <div className="calendar-item">
              <div className="calendar-date">Jun 30, 2026</div>
              <div className="calendar-label">Last Registration</div>
            </div>
            
            <div className="calendar-item active">
              <div className="calendar-date">Aug 9, 2026</div>
              <div className="calendar-label">Symposium Starts</div>
            </div>
            
            <div className="calendar-item">
              <div className="calendar-date">Aug 14, 2026</div>
              <div className="calendar-label">Closing Ceremony</div>
            </div>
            
            <div className="calendar-item">
              <div className="calendar-date">Aug 15, 2026</div>
              <div className="calendar-label">Short Courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Your Spot */}
      <section className="section secure-spot-section">
        <div className="container">
          <div className="section-header">
            <h2>Secure your ISEG Spot</h2>
            <p>09-15 August 2026 @The University of Nairobi, Kenya</p>
          </div>
          
          <div className="countdown-cta-wrapper">
            <div className="countdown-box">
              <div className="countdown-label">Event Starts In</div>
              <div className="countdown-section">
                <Countdown date={eventDate} renderer={CountdownRenderer} />
              </div>
            </div>
            
            <div className="cta-button-box">
              <Link to="/register" className="btn btn-large btn-primary">BOOK YOUR SPOT</Link>
              <p>Limited spots available</p>
            </div>
          </div>

          <div className="event-pass-container">
            <div className="all-event-pass">
              <div className="pass-header">
                <h3>✓ ALL EVENT PASS</h3>
                <p>Get full access to everything</p>
              </div>
              
              <div className="pass-benefits">
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Keynote Presentations</span>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Parallel Session Presentations</span>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Access to Networking</span>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Paper Presentations In Parallel Sessions</span>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Poster Papers</span>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Safari Tour of the Nairobi National Park</span>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Organized Lunch in Nairobi</span>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <span>Tour of the Nairobi National Museum</span>
                </div>
              </div>
              
              <Link to="/register" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>Register Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section light">
        <div className="container">
          <h2>MEGA SYMPOSIUM LEADERSHIP AND PLANNING TEAM!</h2>
          
          <div className="leadership grid grid-2">
            <div className="leader-card">
              <div className="leader-role">Chief Host</div>
              <h3>Prof. Hilary I. Inyang</h3>
              <p>ISEG Honorary President and Founding Chair and Distinguished Professor, Global Institute for Sustainable Development, Advanced Analyses and Design (GISDAAD), Concord, NC, USA and Abuja, Nigeria.</p>
            </div>
            <div className="leader-card">
              <div className="leader-role">ISEG President</div>
              <h3>Prof. Shi Bin</h3>
              <p>Dean of Suzhou High Tech Research Institute, Nanjing University, Suzhou, Jiangsu, China</p>
            </div>
            <div className="leader-card">
              <div className="leader-role">ISEG Vice-President for Africa</div>
              <h3>Prof. Effiom E. Antia</h3>
              <p>Professor of Oceanography, University of Calabar, Calabar, Nigeria.</p>
            </div>
            <div className="leader-card">
              <div className="leader-role">ISEG Vice-President for Asia</div>
              <h3>Prof. Devendra Narain Singh</h3>
              <p>D. L. Shah Chair Professor of Innovation, Indian Institute of Technology, Bombay (IIT-B), Mumbai, India.</p>
            </div>
            <div className="leader-card">
              <div className="leader-role">ISEG Council Member (Europe)</div>
              <h3>Dr. Sue Struthers</h3>
              <p>Mining Environmental Consultant and ISEG Council Member (Europe).</p>
            </div>
            <div className="leader-card">
              <div className="leader-role">Board Member</div>
              <h3>Prof. Leticia Galluzzi</h3>
              <p>Member of the Board of the International Committee of the History of Technology (ICOHTEC) and Professor in the program on history of Science and Epistemology, Federal University of Rio de Janeiro, Brazil.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="#" className="btn btn-outline">View all Members</Link>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="section">
        <div className="container">
          <h2>Event Partners & Sponsors</h2>
          <p className="lead">Our Sponsors are our backbone and they stand to enjoy lots of global benefits.</p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="#" className="btn btn-primary">BECOME A SPONSOR</Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section light">
        <div className="container">
          <h2>ISEG / GGSD Reviews</h2>
          <p className="lead">Reviews from ISEG /GGSD Past attendees.</p>
          
          <div className="testimonials grid grid-2">
            <div className="testimonial-card">
              <p className="quote">"I have been attending for years and I have never regretted it for once. Thanks to ISEG, I made friends and business associates."</p>
              <p className="author"><strong>George Smith</strong></p>
              <p className="role">ISEG Attendee</p>
            </div>
            <div className="testimonial-card">
              <p className="quote">"At first, I was skeptical but, ISEG exceeded my expectations and I must attend ISEG this year."</p>
              <p className="author"><strong>Sally Watson</strong></p>
              <p className="role">ISEG Attendee</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/register" className="btn btn-primary">Register for ISEG 2026</Link>
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="section">
        <div className="container">
          <h2>Venue</h2>
          <p className="lead">University of Nairobi, Kenya</p>
        </div>
      </section>
    </main>
  )
}

export default Home
