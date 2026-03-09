import { useState, useEffect } from 'react'
import Countdown from 'react-countdown'
import { Link } from 'react-router-dom'
import welcomeImage from '../images/welcome 1.png'
import banner1 from '../images/banner/banner_1.jpeg'
import banner2 from '../images/banner/banner_2.jpeg'
import banner3 from '../images/banner/banner_3.jpeg'

import sponsorsImage from '../images/sponsors.jpeg';
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
            <h1 className="hero-title">14TH ISEG/GGSD-2026 <span className="title-highlight">MEGA SYMPOSIUM</span></h1>
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
                <img src={welcomeImage} alt="ISEG/GGSD-2026 Symposium" />
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="welcome-content">
              <h2>Welcome To The 14th ISEG/GGSD-2026 Symposium!</h2>
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
      <h2>2026 ISEG-GGSD MEGA-SYMPOSIUM BULLETIN 3.10: CALL FOR ABSTRACTS AND SPONSORS</h2>
      
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
      <p>This expanded two-part ISEG/GGSD-2026 Mega-Symposium is an outgrowth of 13 regular ISEG conferences/symposia which started in 1993, and many other forums with the continuing objective of applying technical and social science knowledge from a diversity of disciplines to address critical issues in sustainable development as follows:</p>
    </div>

    <div className="two-part-layout parts-table">
      <div className="part-card">
        <div className="part-header part-a-header">
          <h4>Part A</h4>
        </div>
        <div className="part-content">
          <h4>ISEG/GGSD-2026 Mega-Symposium Part A:</h4>
          <h5>14th International Symposium on Environmental Geotechnology and Global Sustainable Development</h5>
          <p>Part A will focus on fundamental aspects of Environmental Geotechnology to be treated by experts from various parts of world, such as researchers, practicing analysts, educators and engineers to present research papers and exhibitions that will cover theoretical modeling, innovative experimentation techniques, new equipment designs, field studies and demonstration projects. Among the major issues and sub-disciplines that will be treated in several sessions are:</p>
          <div className="topics-container">
            <div className="topics-column">
              <ul className="topics-list">
                <li>• Constitutive and numerical modeling of geomaterials</li>
                <li>• Failure models of geomaterials (cracking and other forms of deformation), and mechanical excavation of geomaterials</li>
                <li>• Mechanics of geohazards and ground subsidence</li>
                <li>• Thermal, radiation and chemical processes in geomaterials</li>
                <li>• Geoslope analyses, geofabrics and other stabilization methods</li>
                <li>• Rock mechanics, mining and geomaterials processing</li>
                <li>• Geothermal systems for energy production; gas transport in the subsurface; and carbon capture and disposal in geomedia</li>
                <li>• Characterization and laboratory methods in geomaterials</li>
                <li>• AI and robotics applications in environmental geotechnology</li>
                <li>• Innovative geomonitoring and field mapping techniques</li>
                <li>• Geoenvironmental aspects of climate change</li>
                <li>• Geohydrology of water and contaminant transport</li>
                <li>• Irrigation of geomedia and conservation agriculture</li>
              </ul>
            </div>
            <div className="topics-column">
              <ul className="topics-list">
                <li>• Erosion/flow of granular materials and dust control systems</li>
                <li>• Waste disposal and containment systems in geomedia</li>
                <li>• Design, construction, maintenance and rehabilitation of geostructures and systems</li>
                <li>• Contaminated site remediation and waste containment techniques</li>
                <li>• Soil stabilization with innovative materials (e.g. plastics, polymers and fibers)</li>
                <li>• Biogeotechnology and related analytical support systems</li>
                <li>• Post-war landmine detection techniques</li>
                <li>• Geochronology, including isotopes dating of geomaterials</li>
                <li>• Marine geotechnics and mineral explorations</li>
                <li>• Lunar and Marsian Excavation geotechnics</li>
                <li>• Geo-medical, geo-magnetic and geo-electrical materials, and their application</li>
                <li>• And many more...</li>
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
          <h4>ISEG/GGSD-2026 Mega-Symposium Part B:</h4>
          <h5>2026 Global Geo-Ecosystems and Sustainable Development Symposium</h5>
          <p>Part B is the most recent compliment of the traditional ISEG conferences that have been held since 1993. The continuing objective of Part B of this Mega-Symposium is application of technical and social science knowledge from a diversity of disciplines to address critical issues in sustainable development. This will cover cross-disciplinary analyses of geoenvironmental issues across many socioeconomic sectors such as:</p>
          <div className="topics-container">
            <div className="topics-column">
              <ul className="topics-list">
                <li>• Elements of sustainable development and green economy</li>
                <li>• Environmental laws and global treaties</li>
                <li>• Environmental policy and regulatory frameworks</li>
                <li>• Ecological/forestry systems and blue economy</li>
                <li>• Climate change impacts mitigation and adaptation</li>
                <li>• Contaminant exposure and occupational health</li>
                <li>• Energy systems and environmental sustainability</li>
                <li>• Agriculture and environmental systems</li>
                <li>• Monitoring and visualization systems for risk assessment and decision support</li>
                <li>• Contaminated sediments in rivers and lakes</li>
                <li>• Waste recycling and wastewater management</li>
                <li>• Contaminant exposure pathways and noise pollution</li>
                <li>• Natural disasters disaster/emergency response systems</li>
                <li>• Groundwater, surface water and air pollution</li>
                <li>• Waste disposal and containment systems</li>
                <li>• Soil erosion and stabilization management</li>
              </ul>
            </div>
            <div className="topics-column">
              <ul className="topics-list">
                <li>• Land/environmental conflict resolution techniques</li>
                <li>• Mine site rehabilitation and tailings management systems</li>
                <li>• Environmental impact assessments and auditing techniques</li>
                <li>• Oil spills assessments and insurance systems</li>
                <li>• Environmental education and indigenous knowledge systems in environmental management and environmental justice</li>
                <li>• Youth and gender capacity development</li>
                <li>• Environmental data archiving</li>
                <li>• Science diplomacy for environmental conflict resolution health</li>
                <li>• Environmental law, standards and enforcement</li>
                <li>• Folklore and Poetry</li>
                <li>• Environmental biotechnology and restoration</li>
                <li>• Natural resources and wildlife management</li>
                <li>• And many more...</li>
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
                <p>Begin your journey to the 14th ISEG/GGSD-2026 Mega Symposium with the arrival of participants from around the world.</p>
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
            <h2>REGISTRATION FEES FOR ISEG/GGSD-2026 MEGA SYMPOSIUM</h2>
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
        <div className="calendar-date">August 30, 2025</div>
        <div className="calendar-label">Release of Internal Bulletin 2</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">October 10, 2025</div>
        <div className="calendar-label">Release of Bulletin 3: Call for Abstracts, Sponsored-Session Proposals and Exhibitions</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">April 30, 2026</div>
        <div className="calendar-label">Deadline for Online Submission of 4-Page Abstracts using Specified Format</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">April 30, 2026</div>
        <div className="calendar-label">Deadline for Submission of Sponsored-Session Proposals</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">April 30, 2026</div>
        <div className="calendar-label">Deadline for Submission of Exhibition Plans and Registration</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">June 15, 2026</div>
        <div className="calendar-label">Production of Mega Symposium Program and Call for Registration – Bulletin 4</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">August 1, 2026</div>
        <div className="calendar-label">Deadline for Regular Registration • Deadline for Registration for Shortcourses. (https://www.iseg-ggsd.com.ng/)</div>
      </div>
      
      <div className="calendar-item active">
        <div className="calendar-date">August 9, 2026</div>
        <div className="calendar-label">Beginning of the Mega-Symposium Part A</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">August 15, 2026</div>
        <div className="calendar-label">Closing Ceremony by 12 Noon of the Mega Symposium</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">August 15, 2026</div>
        <div className="calendar-label">BrownBard International Cultural and Literary Festival (BICLF) 2:00 PM – 11:00 PM</div>
      </div>
      
      <div className="calendar-item">
        <div className="calendar-date">August 16, 2026</div>
        <div className="calendar-label">Mega-Symposium Shortcourses</div>
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
    <h2>MEGA SYMPOSIUM LEADERSHIP AND PLANNING TEAM</h2>
    
    {/* Mega Symposium Chair and Chief Host */}
    <div className="chief-host-card">
      <h3 className="chief-host-title">Mega Symposium Chair and Chief Host</h3>
      <div className="chief-host-content">
        <div className="chief-host-name">Prof. Hilary I. Inyang</div>
        <div className="chief-host-credentials">
          ISEG Honorary President and Founding Chair and Distinguished Professor, Global Institute for Sustainable 
          Development, Advanced Analyses and Design (GISDAAD), Concord, NC, USA and Abuja, Nigeria.
        </div>
      </div>
    </div>
    
    {/* Part A Co-Chairs */}
    <div className="leadership-section">
      <h3 className="section-subtitle">Part A Co-Chairs</h3>
      <div className="leadership-grid grid-3">
        <div className="leader-card">
          <h4>Prof. Shi Bin</h4>
          <p className="leader-role">ISEG President</p>
          <p className="leader-affiliation">Dean of Suzhou High-Tech Research Institute, Nanjing Univ., Suzhou, Jiangsu, China</p>
        </div>
        <div className="leader-card">
          <h4>Prof. Effiom E. Antia</h4>
          <p className="leader-role">ISEG Vice-President for Africa</p>
          <p className="leader-affiliation">Professor of Oceanography, Univ. of Calabar, Calabar, Nigeria</p>
        </div>
        <div className="leader-card">
          <h4>Prof. Devendra Narain Singh</h4>
          <p className="leader-role">ISEG Vice-President for Asia</p>
          <p className="leader-affiliation">D. L. Shah Chair Professor of Innovation, Indian Institute of Technology, Bombay (IIT-B), Mumbai, India</p>
        </div>
        <div className="leader-card">
          <h4>Dr. Sue Struthers</h4>
          <p className="leader-role">ISEG Council Member (Europe)</p>
          <p className="leader-affiliation">Mining Environmental Consultant</p>
        </div>
        <div className="leader-card">
          <h4>Prof. Leticia Galluzzi</h4>
          <p className="leader-role">ICOHTEC Board Member</p>
          <p className="leader-affiliation">Professor, History of Science and Epistemology, Federal University of Rio de Janeiro, Brazil</p>
        </div>
      </div>
    </div>

    {/* Part A International Scientific Committee */}
    <div className="leadership-section">
      <h3 className="section-subtitle">Part A International Scientific Committee</h3>
      
      <div className="committee-leadership">
        <div className="committee-chair">
          <h4>Chair:</h4>
          <div className="chair-card">
            <p><strong>Prof. Chao-Sheng Tang</strong> - Secretary-General, ISEG and Professor at Nanjing University, and President of Youth Committee of Engineering Geology in China</p>
          </div>
        </div>
        
        <div className="committee-co-chairs">
          <h4>Co-Chairs:</h4>
          <div className="co-chairs-grid grid-3">
            <div className="co-chair-card">
              <p><strong>Prof. Irene M.C. LO</strong> - Chair Professor, Hong Kong University of Science and Technology, Hong Kong</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Joze Kortnik</strong> - Professor, Faculty of Natural Sciences and Engineering, University of Lublajna, Slovenia</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Bian Zhengfu</strong> - Vice President, China University of Mining and Technology (CUMT), Xuzhou, China</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Miguel Pando</strong> - Associate Professor, College of Engineering, Drexel University, Philadelphia, USA</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Claudio Mahler</strong> - Emeritus Professor of Geotechnology, Universite de Rio de Janeiro, Rio, Brazil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Part A Members Table */}
      <div className="members-table-section">
        <h4>Members (TBI = to be invited)</h4>
        <div className="table-responsive">
          <table className="members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country/Region</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Dr. Fidelis Abija</td><td>Nigeria</td></tr>
              <tr><td>Prof. Sunyoung Bae</td><td>South Korea</td></tr>
              <tr><td>Prof. Bate Bate</td><td>China</td></tr>
              <tr><td>Prof. Myint Win Bo</td><td>Canada</td></tr>
              <tr><td>Prof. Susan E. Burns</td><td>USA</td></tr>
              <tr><td>Prof. Xiaohui Chen</td><td>UK</td></tr>
              <tr><td>Prof. Yong-Gui Chen</td><td>China</td></tr>
              <tr><td>Prof. Hyunwook Choo</td><td>South Korea</td></tr>
              <tr><td>Prof. Nilo C. Consoli</td><td>Italy</td></tr>
              <tr><td>Prof. John Daniels</td><td>USA</td></tr>
              <tr><td>Prof. Gautham Das</td><td>USA</td></tr>
              <tr><td>Prof. Sarat Das</td><td>India</td></tr>
              <tr><td>Prof. Yong-Feng Deng</td><td>China</td></tr>
              <tr><td>Prof. Andrea Dominijanni</td><td>Italy</td></tr>
              <tr><td>Prof. Yan-Jun Du</td><td>China</td></tr>
              <tr><td>Mr. Benjamin Essin</td><td>Nigeria/US</td></tr>
              <tr><td>Prof. Xuanmei Fan</td><td>China</td></tr>
              <tr><td>Prof. Xunchang Fei</td><td>Singapore</td></tr>
              <tr><td>Prof. Shijin Feng</td><td>China</td></tr>
              <tr><td>Dr. Victor Fodeke</td><td>Nigeria</td></tr>
              <tr><td>Prof. T. Cassia de Brito Galvão</td><td>Brazil/US</td></tr>
              <tr><td>Prof. Liming Hu</td><td>China</td></tr>
              <tr><td>Prof. Andrew Hursthouse</td><td>UK</td></tr>
              <tr><td>Prof. Olusegun Ige</td><td>Nigeria</td></tr>
              <tr><td>Prof. Fei Jin</td><td>United Kingdom</td></tr>
              <tr><td>Prof. Eugeniusz Koda</td><td>Poland</td></tr>
              <tr><td>Prof. Jayantha Kodikara</td><td>Australia</td></tr>
              <tr><td>Dr. Makarius Lalika</td><td>Tanzania</td></tr>
              <tr><td>Prof. Changho Lee</td><td>South Korea</td></tr>
              <tr><td>Prof. Anthony Leung</td><td>China</td></tr>
              <tr><td>Prof. Eng Choon Leong</td><td>Singapore</td></tr>
              <tr><td>Prof. Werner Lienhart</td><td>Austria</td></tr>
              <tr><td>Prof. Biao Li</td><td>Canada</td></tr>
              <tr><td>Prof. Cheng Lin</td><td>Canada</td></tr>
              <tr><td>Prof. Gustavo B. Meneze</td><td>USA</td></tr>
              <tr><td>Prof. Mojgan Hadi Mosleh</td><td>UK</td></tr>
              <tr><td>Prof. Charles W.W. NG</td><td>China</td></tr>
              <tr><td>Prof. Vincent O. Ogunro</td><td>USA</td></tr>
              <tr><td>Prof. Brendan O'Kelly</td><td>Ireland</td></tr>
              <tr><td>Prof. Frank Otto</td><td>Germany</td></tr>
              <tr><td>Mr. Amit Otukar</td><td>India</td></tr>
              <tr><td>Prof. Evan K. Paleologos</td><td>United Arab Emirates</td></tr>
              <tr><td>Prof. Ennio Marques Palmeira</td><td>Brazil</td></tr>
              <tr><td>Prof. Marina Pirulli</td><td>Italy</td></tr>
              <tr><td>Prof. Anna Podlasek</td><td>Poland</td></tr>
              <tr><td>Prof. Hefu Pu</td><td>China</td></tr>
              <tr><td>Prof. Krishna R. Reddy</td><td>USA</td></tr>
              <tr><td>Prof. Enrique Romero</td><td>Spain</td></tr>
              <tr><td>Prof. Theo Sarris</td><td>New Zealand</td></tr>
              <tr><td>Prof. Sreedeep Sekharan</td><td>India</td></tr>
              <tr><td>Prof. Anh-Minh Tang</td><td>France</td></tr>
              <tr><td>Prof. Kuo Tian</td><td>USA</td></tr>
              <tr><td>Prof. Daniel C.W. Tsang</td><td>China</td></tr>
              <tr><td>Prof. Farshid Vahedifard</td><td>USA</td></tr>
              <tr><td>Prof. Magdalena Daria Vaverková</td><td>Poland</td></tr>
              <tr><td>Prof. Castorina Silva Vieira</td><td>Portugal</td></tr>
              <tr><td>Prof. Claudia Vitone</td><td>Italy</td></tr>
              <tr><td>Prof. Gonghui Wang</td><td>Japan</td></tr>
              <tr><td>Dr. Yongjun Yang</td><td>China</td></tr>
              <tr><td>Prof. Albert T. Yeung</td><td>Chinese Taipei</td></tr>
              <tr><td>Prof. Fusheng Zha</td><td>China</td></tr>
              <tr><td>Prof. Liangtong Zhan</td><td>China</td></tr>
              <tr><td>Prof. Feng Zhang</td><td>China</td></tr>
              <tr><td>Prof. An-Nan Zhou</td><td>Australia</td></tr>
              <tr><td>Prof. Marawan Merrouana</td><td>Algeria</td></tr>
              <tr><td>Mrs. Victoria Micheal-Dick</td><td>UK</td></tr>
              <tr><td>Prof. Srinivas Pulugurtha</td><td>USA</td></tr>
              <tr><td>Prof. Michael McFarland</td><td>USA</td></tr>
              <tr><td>Dr. David Blockstein</td><td>USA</td></tr>
              <tr><td>Prof. David Kargbo</td><td>Iraq</td></tr>
              <tr><td>Mr. Olatunji Lawal</td><td>-</td></tr>
              <tr><td>Mr. Godwin Amadasun</td><td>Greece</td></tr>
              <tr><td>Dr. Rita S. Senise</td><td>Sweden</td></tr>
              <tr><td>Dr. Wayne Jones</td><td>USA</td></tr>
              <tr><td>Prof. Shaogang Lei</td><td>China</td></tr>
              <tr><td>Dr Bobgiwe Moni</td><td>South Africa</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Part B Co-Chairs */}
    <div className="leadership-section">
      <h3 className="section-subtitle">Part B Co-Chairs</h3>
      <div className="leadership-grid grid-3">
        <div className="leader-card">
          <h4>Prof. Xiaoshun Qin</h4>
          <p className="leader-affiliation">Association of China-Africa Smallholder Agriculture (ACASA), University of South Africa (UniSA)</p>
        </div>
        <div className="leader-card">
          <h4>Prof. Faten Bahar</h4>
          <p className="leader-affiliation">Deputy Director, Future Earth Africa Hub Leadership Center, University of Pretoria, South Africa</p>
        </div>
        <div className="leader-card">
          <h4>Prof. Lise Korsten</h4>
          <p className="leader-affiliation">President, African Academy of Sciences, and Co-Director of the DST-NRF Centre of Excellence in Food Security, University of Pretoria, South Africa</p>
        </div>
        <div className="leader-card">
          <h4>Dr. Theresa Isibor</h4>
          <p className="leader-affiliation">Director, International Center for Community Development (ICCD), Concord, NC, USA</p>
        </div>
        <div className="leader-card">
          <h4>Dr. Daniel Nyanganyura</h4>
          <p className="leader-affiliation">Director of the Future Earth Africa Hub Leadership Centre, Pretoria, South Africa</p>
        </div>
        <div className="leader-card">
          <h4>Prof. Malik Maaza</h4>
          <p className="leader-affiliation">Africa & Int. Relations Manager, iThemba LABS-NRF, Univ. of South Africa, Pretoria, South Africa</p>
        </div>
        <div className="leader-card">
          <h4>Prof. Godwin Mbamalu</h4>
          <p className="leader-affiliation">Associate Vice President for Research, Benedict College, Univ. of South Carolina, USA</p>
        </div>
      </div>
    </div>

    {/* Part B International Scientific Committee */}
    <div className="leadership-section">
      <h3 className="section-subtitle">Part B International Scientific Committee</h3>
      
      <div className="committee-leadership">
        <div className="committee-chair">
          <h4>Chair:</h4>
          <div className="chair-card">
            <p><strong>Prof. Thokozani Simelane</strong> - Professor of Practice, Faculty of Engineering and Built Environment, Univ. of Johannesburg, South Africa</p>
          </div>
        </div>
        
        <div className="committee-co-chairs">
          <h4>Co-Chairs:</h4>
          <div className="co-chairs-grid grid-3">
            <div className="co-chair-card">
              <p><strong>Dr. Nkem Khumbah</strong> - Head of STI Policy Systems, Governance, and Partnerships, African Academy of Science (AAS)</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Kefei Zhang</strong> - Professor, China University of Mining and Technology (CUMT), Xuzhou, Jiangsu Province, P.R.China</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Aster Gebrekirstos</strong> - Scientist, World Agroforestry (CIFOR-ICRAF), Ethiopia and Germany</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Evan K. Paleologos</strong> - Dir. Engr. Mgt. (MEM) and Project Mgt. (MPM), College of Eng., Abu Dhabi University, Abu Dhabi, UAE</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Chief Joseph Akpan</strong> - Vice-Chair of the Board, United Infrastructure Systems (UIS) Limited, Abuja, Nigeria</p>
            </div>
            <div className="co-chair-card">
              <p><strong>Prof. Michael Nxumalo</strong> - Acting Global Hub Director, Africa Hub, Future Earth, South Africa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Part B Members Table */}
      <div className="members-table-section">
        <h4>Members (TBI = to be invited)</h4>
        <div className="table-responsive">
          <table className="members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country/Region</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Prof. Charles Hongoro</td><td>-</td></tr>
              <tr><td>Prof. Friday Okonofua</td><td>Nigeria</td></tr>
              <tr><td>Prof. Raphael Munavu</td><td>Kenya</td></tr>
              <tr><td>Prof. Rajaâ Cherkaoui El Moursli</td><td>Morocco</td></tr>
              <tr><td>Mr. Miguel Gonzalez</td><td>USA/Venezuela</td></tr>
              <tr><td>Prof. Olubayi Olubayi</td><td>Kenya</td></tr>
              <tr><td>Dr. Mkhize Xolile</td><td>South Africa</td></tr>
              <tr><td>Dr. Imoh Imoh-Itah</td><td>Nigeria</td></tr>
              <tr><td>Prof. Cyprian Ekpo</td><td>Nigeria</td></tr>
              <tr><td>Dr. Austin Onwukwe</td><td>Nigeria/USA</td></tr>
              <tr><td>Dr. Abebech Abera</td><td>Ethiopia</td></tr>
              <tr><td>Prof. Hasan Mohammed</td><td>USA</td></tr>
              <tr><td>Dr. Imoh Ekpo</td><td>Nigeria</td></tr>
              <tr><td>Dr. Saminu Dagari</td><td>Nigeria</td></tr>
              <tr><td>Prof. Gustavo Borel Menezes</td><td>USA</td></tr>
              <tr><td>Dr. Wayne Philips</td><td>USA</td></tr>
              <tr><td>Dr. Henry Emejuo</td><td>Nigeria</td></tr>
              <tr><td>Prof. Anthony Okoh</td><td>Nigeria</td></tr>
              <tr><td>Chief Noble Akenge</td><td>Nigeria</td></tr>
              <tr><td>Prof. John Osonwa</td><td>Nigeria</td></tr>
              <tr><td>Dr. Abel Udoh</td><td>Turkey</td></tr>
              <tr><td>Prof. Mammo Muchie</td><td>South Africa/Ethiopia</td></tr>
              <tr><td>Dr. Thompson Makahamadze</td><td>USA/Zimbabwe</td></tr>
              <tr><td>Amb. Adeniran Michael Timothy</td><td>Nigeria</td></tr>
              <tr><td>Prof. Xiaoshun Qin</td><td>China</td></tr>
              <tr><td>Mr. Victor Ibok</td><td>Nigeria</td></tr>
              <tr><td>Mr. Imoh Ekpo</td><td>Nigeria</td></tr>
              <tr><td>Dr. Thomas Akpan</td><td>Nigeria</td></tr>
              <tr><td>Prof. Dali Naidu Arnepali</td><td>India</td></tr>
              <tr><td>Dr. Austin</td><td>Nigeria</td></tr>
              <tr><td>Mr. Marshal Anako</td><td>Nigeria</td></tr>
              <tr><td>Mr. Chukwuma Ngaha</td><td>Nigeria</td></tr>
              <tr><td>Maj. Gen. Udaya</td><td>Nigeria</td></tr>
              <tr><td>Mr. Sonie Braih</td><td>USA</td></tr>
              <tr><td>Dr. James Mushori</td><td>Kenya</td></tr>
              <tr><td>Dr. Aniefon</td><td>Nigeria</td></tr>
              <tr><td>Mr. Nicholas Amessouwoe</td><td>Ghana</td></tr>
              <tr><td>Ms. Angel Williams</td><td>Nigeria</td></tr>
              <tr><td>Prof. Arvin Farid</td><td>USA</td></tr>
              <tr><td>Mr. Ismaila Ahmed</td><td>Nigeria</td></tr>
              <tr><td>Mr. Sefia Okeoghenemaro</td><td>Nigeria</td></tr>
              <tr><td>Prof. John John</td><td>Nigeria</td></tr>
              <tr><td>Barr. Ebokpo</td><td>Nigeria</td></tr>
              <tr><td>Amb. Rabiu Dagari</td><td>-</td></tr>
              <tr><td>Mr. Emmanuel Udedeh</td><td>-</td></tr>
              <tr><td>Prof. Ogumola</td><td>Nigeria</td></tr>
              <tr><td>Mr Henry Etuk</td><td>Nigeria</td></tr>
              <tr><td>Dr. Tribhuwan Prasad</td><td>India</td></tr>
              <tr><td>Prof. Chinedu Mmom</td><td>Nigeria</td></tr>
              <tr><td>Mr. Promise Amahah</td><td>Nigeria</td></tr>
              <tr><td>Chief Joseph Akpan</td><td>Nigeria</td></tr>
              <tr><td>Dr. Ekere Ukwang</td><td>Nigeria</td></tr>
              <tr><td>Dr. Bosco Okolo-Obi</td><td>Nigeria</td></tr>
              <tr><td>Group Capt. Bilal</td><td>Nigeria</td></tr>
              <tr><td>Dr. Benedeth Ebere</td><td>Nigeria</td></tr>
              <tr><td>Mr. Iniobong Nwoko</td><td>Nigeria/US</td></tr>
              <tr><td>Engr. Obasi</td><td>Nigeria</td></tr>
              <tr><td>Mr. Olusola Kayode</td><td>Nigeria</td></tr>
              <tr><td>Mr. Dos Santos Pinto Mandu</td><td>Switzerland</td></tr>
              <tr><td>Dr. Kiichi Watanabe</td><td>China/Japan</td></tr>
              <tr><td>Dr. L. Rodney Managa</td><td>SA</td></tr>
              <tr><td>Engr. Mpho Mphengula</td><td>Botswana</td></tr>
              <tr><td>Dr. Jasmina Saric</td><td>Switzerland</td></tr>
              <tr><td>Dr. Patrick Ezekiel</td><td>Nigeria</td></tr>
              <tr><td>Mr. Praether Cooper</td><td>USA</td></tr>
              <tr><td>Dr. Malcolm Field</td><td>USA</td></tr>
              <tr><td>Mr. Ibiam Ogejiofor</td><td>Nigeria</td></tr>
              <tr><td>Prof. Charles Adetunji</td><td>Nigeria</td></tr>
              <tr><td>Prof. John Ifediora</td><td>Nigeria</td></tr>
              <tr><td>Dr. Lu Pin</td><td>China</td></tr>
              <tr><td>Prof. Aniekan Edet</td><td>Nigeria</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Composite Planning Committee */}
    <div className="leadership-section">
      <h3 className="section-subtitle">COMPOSITE PLANNING COMMITTEE</h3>
      
      <div className="committee-leadership-card">
        <div className="leadership-row">
          <div className="leadership-item">
            <span className="leadership-title">Chair:</span>
            <div className="leadership-details">
              <strong>Prof. Thokozani Simelane</strong>
              <span className="affiliation">Professor of Practice, Faculty of Engineering and Built Environment, University of Johannesburg, South Africa</span>
            </div>
          </div>
        </div>
        
        <div className="leadership-grid-2">
          <div className="leadership-item">
            <span className="leadership-title">Co-Chair and Administrative Contact:</span>
            <div className="leadership-details">
              <strong>Mrs. Helen Ajuzieogu</strong>
              <span className="affiliation">GISDAAD</span>
            </div>
          </div>
          
          <div className="leadership-item">
            <span className="leadership-title">Co-Chair and ISEG Secretariat Contact:</span>
            <div className="leadership-details">
              <strong>Prof. Chao-Sheng Tang</strong>
              <span className="affiliation">ISEG</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Committee Members */}
      <div className="committee-members-section">
        <h4>COMPOSITE PLANNING COMMITTEE MEMBERS</h4>
        
        <div className="members-grid-container">
          {/* Row 1 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Prof. Sunyoung Bae</span> <span className="member-country">(South Korea)</span></div>
            <div className="member-item"><span className="member-name">Dr. Kai Gu</span> <span className="member-country">(China)</span></div>
            <div className="member-item"><span className="member-name">Prof. Hong-Hu Zhu</span> <span className="member-country">(China)</span></div>
          </div>
          
          {/* Row 2 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Dr. Cheng Zhu</span> <span className="member-country">(China)</span></div>
            <div className="member-item"><span className="member-name">Dr. Qing Cheng</span> <span className="member-country">(China)</span></div>
            <div className="member-item"><span className="member-name">Dr. Zheng-Tao Shen</span> <span className="member-country">(China)</span></div>
          </div>
          
          {/* Row 3 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Dr. Fei Wang</span> <span className="member-country">(China)</span></div>
            <div className="member-item"><span className="member-name">Dr. Zhixiong Zeng</span> <span className="member-country">(China)</span></div>
            <div className="member-item"><span className="member-name">Dr. Cheng-Cheng Zhang</span> <span className="member-country">(China)</span></div>
          </div>
          
          {/* Row 4 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Mr. Peter Nwachukwu</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Session Coordinator</span></div>
            <div className="member-item"><span className="member-name">Mrs. Grace Eneh</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Training Session Liaison</span></div>
            <div className="member-item"><span className="member-name">Mrs. Helen Ajuzieogu</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Symposium Coordinator</span></div>
          </div>
          
          {/* Row 5 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Amb. Idah O. K. David</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Music Session Coordinator</span></div>
            <div className="member-item"><span className="member-name">Prof. Anthony Okoh</span> <span className="member-country">(Nigeria)</span></div>
            <div className="member-item"><span className="member-name">Mr. George Onsongo</span> <span className="member-country">(Kenya)</span> <span className="member-role">Safari and Museum Visits Coordinator</span></div>
          </div>
          
          {/* Row 6 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Mr. Yunusa M. Yusuf</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Technical Coordinator</span></div>
            <div className="member-item"><span className="member-name">Ms. Evin Umanah Ekaete</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Supervisor for Ushers</span></div>
            <div className="member-item"><span className="member-name">Ms. Ruth Jambu Wamu</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Videographer</span></div>
          </div>
          
          {/* Row 7 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Mrs. Nnenna Bassey</span> <span className="member-country">(Nigeria)</span> <span className="member-role">News</span></div>
            <div className="member-item"><span className="member-name">Mrs. Cornelia Akpan</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Exhibition Coordinator</span></div>
            <div className="member-item"><span className="member-name">Mr. James Mbat</span> <span className="member-country">(Nigeria)</span> <span className="member-role">Deputy Course Coordinator</span></div>
          </div>
          
          {/* Row 8 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Ms. Tracy Uzoigwe</span> <span className="member-country">(Nigeria)</span></div>
            <div className="member-item"><span className="member-name">Mr. Kris Ekefre</span> <span className="member-country">(Nigeria)</span></div>
            <div className="member-item"><span className="member-name">Mr. Bonny Alaneme</span> <span className="member-country">(Nigeria)</span></div>
          </div>
          
          {/* Row 9 */}
          <div className="member-row">
            <div className="member-item"><span className="member-name">Ms. Amarachi Cheryl Ogbonnaya</span> <span className="member-country">(Nigeria)</span></div>
            <div className="member-item"><span className="member-name">Dr. Hao Zeng</span> <span className="member-country">(Spain)</span></div>
            <div className="member-item"><span className="member-name">Ms. Ogunjobi Esther</span> <span className="member-country">(Nigeria)</span></div>
          </div>
        </div>
        
        {/* Compact view for mobile and table alternative */}
        <div className="members-table-compact">
          <h4>Committee Members Directory</h4>
          <div className="table-responsive">
            <table className="members-compact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Prof. Sunyoung Bae</td><td>South Korea</td><td>—</td></tr>
                <tr><td>Dr. Kai Gu</td><td>China</td><td>—</td></tr>
                <tr><td>Prof. Hong-Hu Zhu</td><td>China</td><td>—</td></tr>
                <tr><td>Dr. Cheng Zhu</td><td>China</td><td>—</td></tr>
                <tr><td>Dr. Qing Cheng</td><td>China</td><td>—</td></tr>
                <tr><td>Dr. Zheng-Tao Shen</td><td>China</td><td>—</td></tr>
                <tr><td>Dr. Fei Wang</td><td>China</td><td>—</td></tr>
                <tr><td>Dr. Zhixiong Zeng</td><td>China</td><td>—</td></tr>
                <tr><td>Dr. Cheng-Cheng Zhang</td><td>China</td><td>—</td></tr>
                <tr><td>Mr. Peter Nwachukwu</td><td>Nigeria</td><td>Session Coordinator</td></tr>
                <tr><td>Mrs. Grace Eneh</td><td>Nigeria</td><td>Training Session Liaison</td></tr>
                <tr><td>Mrs. Helen Ajuzieogu</td><td>Nigeria</td><td>Symposium Coordinator</td></tr>
                <tr><td>Amb. Idah O. K. David</td><td>Nigeria</td><td>Music Session Coordinator</td></tr>
                <tr><td>Prof. Anthony Okoh</td><td>Nigeria</td><td>—</td></tr>
                <tr><td>Mr. George Onsongo</td><td>Kenya</td><td>Safari and Museum Visits Coordinator</td></tr>
                <tr><td>Mr. Yunusa M. Yusuf</td><td>Nigeria</td><td>Technical Coordinator</td></tr>
                <tr><td>Ms. Evin Umanah Ekaete</td><td>Nigeria</td><td>Supervisor for Ushers</td></tr>
                <tr><td>Ms. Ruth Jambu Wamu</td><td>Nigeria</td><td>Videographer</td></tr>
                <tr><td>Mrs. Nnenna Bassey</td><td>Nigeria</td><td>News</td></tr>
                <tr><td>Mrs. Cornelia Akpan</td><td>Nigeria</td><td>Exhibition Coordinator</td></tr>
                <tr><td>Mr. James Mbat</td><td>Nigeria</td><td>Deputy Course Coordinator</td></tr>
                <tr><td>Ms. Tracy Uzoigwe</td><td>Nigeria</td><td>—</td></tr>
                <tr><td>Mr. Kris Ekefre</td><td>Nigeria</td><td>—</td></tr>
                <tr><td>Mr. Bonny Alaneme</td><td>Nigeria</td><td>—</td></tr>
                <tr><td>Ms. Amarachi Cheryl Ogbonnaya</td><td>Nigeria</td><td>—</td></tr>
                <tr><td>Dr. Hao Zeng</td><td>Spain</td><td>—</td></tr>
                <tr><td>Ms. Ogunjobi Esther</td><td>Nigeria</td><td>—</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link to="#" className="btn btn-outline">View Full Leadership Directory</Link>
    </div>
  </div>
</section>






      {/* Sponsors */}
     <section className="section">
  <div className="container">
    <h2>Event Partners & Sponsors</h2>
    <p className="lead">Our Sponsors are our backbone and they stand to enjoy lots of global benefits.</p>
    
    {/* Single Sponsor Image */}
    <div className="sponsor-image-container">
     <img 
      src={sponsorsImage} 
      alt="ISEG/GGSD-2026 Sponsors" 
      className="sponsor-main-image" 
    />
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link to="#" className="btn btn-primary">BECOME A SPONSOR</Link>
    </div>
  </div>
</section>

      {/* Reviews */}
      <section className="section light">
        <div className="container">
          <h2>ISEG/GGSD-2026 Reviews</h2>
          <p className="lead">Reviews from ISEG/GGSD-2026 Past attendees.</p>
          
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



   
    <section className="contacts-section">
      <div className="container">
        <div className="contacts-header">
          <h2 className="contacts-main-title">ISEG/GGSD-2026 MEGA SYMPOSIUM CONTACTS</h2>
          <p className="contacts-subtitle">Get in touch with our global liaison offices and planning teams</p>
        </div>
        
        <div className="contacts-grid">
          {/* Overall Planning Headquarters */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🏢</div>
              <h3>Overall Planning Headquarters</h3>
              <p className="contact-address">No. 6, Gabon Street, EFAB Metropolis Estate, Karsana, Gwarimpa, Abuja, FCT, Nigeria</p>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Mrs. Helen Ajuzieogu</span>
                  <span className="personnel-role">(Symposium Coordinator)</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:helen.gisdaad@gmail.com">helen.gisdaad@gmail.com</a></p>
                  <p><span className="info-label">Tel:</span> <a href="tel:+2348063947292">+234 806 394 7292</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Liaison Office in China */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🇨🇳</div>
              <h3>Liaison Office in China</h3>
              <p className="contact-address">ISEG Secretariat, Nanjing University, China</p>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Prof. Chao Sheng Tang</span>
                  <span className="personnel-role">(ISEG Secretary General)</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:iseg@nju.edu.cn">iseg@nju.edu.cn</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Liaison Office in USA */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🇺🇸</div>
              <h3>Liaison Office in USA</h3>
              <p className="contact-address">GISDAAD/ICCD Joint Office, Concord, NC, USA</p>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Dr. Theresa Isibor</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:tnisibor@iccdconcord.org">tnisibor@iccdconcord.org</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Liaison Office in Kenya */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🇰🇪</div>
              <h3>Liaison Office in Kenya</h3>
              <p className="contact-address">AAS Secretariat, Nairobi, Kenya</p>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Dr. Nkem Khumbah</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:n.khumbah@aasciences.africa">n.khumbah@aasciences.africa</a></p>
                  <p><span className="info-label">Tel:</span> <a href="tel:+17342550158">+1 734-255-0158</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* General and Session Sponsorship */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🤝</div>
              <h3>General & Session Sponsorship</h3>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Dr. James Mushori</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:jameskenya23@yahoo.com">jameskenya23@yahoo.com</a></p>
                  <p><span className="info-label">WhatsApp:</span> <a href="https://wa.me/254721397073">+254 721 397073</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Safari/Museum Tour Planning */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🦒</div>
              <h3>Safari/Museum Tour Planning</h3>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Mr. George Onsongo</span>
                  <span className="personnel-role">(Nairobi, Kenya)</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:gonsongo@gmail.com">gonsongo@gmail.com</a></p>
                  <p><span className="info-label">Tel:</span> <a href="tel:+254704919592">+254 7049 19592</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Liaison Office in South Africa 1 */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🇿🇦</div>
              <h3>Liaison Office in South Africa 1</h3>
              <p className="contact-address">Univ. of Johannesburg/Human Sciences Research Council, Pretoria, South Africa</p>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Prof. Thokozani Simelane</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:TSimelane@hsrc.ac.za">TSimelane@hsrc.ac.za</a></p>
                  <p><span className="info-label">Tel:</span> <a href="tel:+27792690663">+27 79 269 0663</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Liaison Office in South Africa 2 */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">🌍</div>
              <h3>Liaison Office in South Africa 2</h3>
              <p className="contact-address">Future Earth Institute, c/o University of Pretoria, Pretoria, South Africa</p>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Prof. Faten Attig-Bahar</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:faten.bahar@gmail.com">faten.bahar@gmail.com</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Short-courses Arrangements */}
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-icon">📚</div>
              <h3>Short-courses Arrangements</h3>
              <div className="contact-details">
                <div className="contact-personnel">
                  <span className="personnel-label">Contact Personnel:</span>
                  <span className="personnel-name">Mr. Misbahu Yunusa Yusuf</span>
                </div>
                <div className="contact-info">
                  <p><span className="info-label">Email:</span> <a href="mailto:yunusamisbahu@gmail.com">yunusamisbahu@gmail.com</a></p>
                  <p><span className="info-label">Phone:</span> <a href="tel:+2348130781117">+234 8130781117</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </main>
  )
}

export default Home
