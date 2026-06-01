import { useState } from 'react'
import './Workshops.css'

const Workshops = () => {
  const [expandedCoursesIndex, setExpandedCoursesIndex] = useState(null)
  const workshops = [
    {
      id: 'tw1',
      code: 'TW.1',
      title: 'Oil and Gas Industry Training Workshop',
      date: 'Saturday, August 15, 2026',
      time: '8:30 AM - 4:30 PM',
      fee: '$3,000',
      color: '#e67e22',
      coordinators: [
        { name: 'Mr. James Eneji Odey', email: 'jamesodey2015@gmail.com' },
        { name: 'Mr. Emmanuel Udede', email: 'emman.udedeh@gmail.com' }
      ],
      description: 'Comprehensive training for professionals in the oil and gas industry, covering waste management, exploration, treatment technologies, and project management.',
      courses: [
        { code: 'TW.1A', title: 'Fundamentals of Large-scale Waste Recycling Systems' },
        { code: 'TW.1B', title: 'Principles and Practice of Exploration Geophysics for Oil and Gas' },
        { code: 'TW.1C', title: 'A Prime Course on Industrial Waste Water Treatment Technologies' },
        { code: 'TW.1D', title: 'Analysis and Control of Oil Spills' },
        { code: 'TW.1E', title: 'Environmental Law Principles and Practices' },
        { code: 'TW.1F', title: 'Principles of Project Management' }
      ],
      bonusForum: 'Forum FA.9 - Innovations and Opportunities in the Oil and Gas Industry',
      featured: true
    },
    {
      id: 'tw2',
      code: 'TW.2',
      title: 'Global South Mid-Career Training Workshop',
      date: 'Sunday, August 16, 2026',
      time: '8:30 AM - 4:30 PM',
      fee: '$2,000',
      color: '#2ecc71',
      coordinators: [
        { name: 'Dr. Daniel Nyanganyura', email: 'daniel.nyanganyura@ru.ac.za' },
        { name: 'Prof. Sharizad Dahlan', email: 'sharizad@istic-unesco.org', phone: '+603 2698 4540' },
        { name: 'Ms. Esther Ogunjobi', email: 'estheroluwabunmi222@gmail.com' }
      ],
      description: 'Mid-career development workshop designed for professionals in the Global South, focusing on business development, database management, conflict resolution, and project management.',
      courses: [
        { code: 'TW.2A', title: 'Database Management Systems' },
        { code: 'TW.2B', title: 'Principles and Processes of Business Plan Development' },
        { code: 'TW.2C', title: 'Fundamentals of Conflict Resolution: From Local Communities to Nations' },
        { code: 'TW.2D', title: 'Principles of Project Management' }
      ],
      bonusForum: 'Forum FA.14 - ICT and Artificial Intelligence (AI) for Sustainable Development',
      featured: false
    }
  ]

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Training Workshops</h1>
          <p>Advanced Professional Development at ISEG/GGSD-2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Intro Section */}
          <div className="workshops-intro-section">
            <div className="intro-content">
              <h2>Specialized Training Programs</h2>
              <p>
                ISEG/GGSD 2026 offers two comprehensive training workshops featuring expert-led instruction 
                in specialized fields. Each workshop includes professional materials and continuing education certificates.
              </p>
              <div className="key-info">
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <div>
                    <strong>Dates</strong>
                    <p>August 15-16, 2026</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📝</span>
                  <div>
                    <strong>Registration Deadline</strong>
                    <p>July 4, 2026</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>Maanzoni 680 Hotel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workshops Grid */}
          <div className="workshops-container">
            {workshops.map((workshop, idx) => (
              <div key={workshop.id} className={`workshop-item ${workshop.featured ? 'featured-workshop' : ''}`}>
                <div className={`workshop-card ${workshop.id}`}>
                  {/* Header */}
                  <div className="workshop-header-new">
                    <div className="workshop-code-badge">{workshop.code}</div>
                    <h3>{workshop.title}</h3>
                  </div>

                  {/* Key Details */}
                  <div className="workshop-quick-info">
                    <div className="quick-info-item">
                      <span>📅</span>
                      <div>
                        <p className="label">Date</p>
                        <p className="value">{workshop.date}</p>
                        <p className="value">{workshop.time}</p>
                      </div>
                    </div>
                    <div className="quick-info-item">
                      <span>💰</span>
                      <div>
                        <p className="label">Fee</p>
                        <p className="value fee">{workshop.fee}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="workshop-description">
                    <p>{workshop.description}</p>
                  </div>

                  {/* Courses */}
                  <div className="courses-section">
                    <div className="courses-header" onClick={() => setExpandedCoursesIndex(expandedCoursesIndex === idx ? null : idx)}>
                      <h4>📚 Course Modules ({workshop.courses.length})</h4>
                      <span className="expand-icon">{expandedCoursesIndex === idx ? '▲' : '▼'}</span>
                    </div>
                    {expandedCoursesIndex === idx && (
                      <div className="courses-list-new">
                        {workshop.courses.map((course, i) => (
                          <div key={i} className="course-item">
                            <span className="course-code">{course.code}</span>
                            <span className="course-title">{course.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bonus Forum */}
                  <div className="bonus-forum-new">
                    <p><strong>✨ Bonus:</strong> {workshop.bonusForum}</p>
                  </div>

                  {/* Coordinators */}
                  <div className="coordinators-section-new">
                    <h4>👥 Workshop Coordinators</h4>
                    <div className="coordinators-list-new">
                      {workshop.coordinators.map((coordinator, i) => (
                        <div key={i} className="coordinator-card">
                          <p className="coordinator-name">{coordinator.name}</p>
                          <a href={`mailto:${coordinator.email}`} className="coordinator-email">
                            📧 {coordinator.email}
                          </a>
                          {coordinator.phone && <p className="coordinator-phone">📞 {coordinator.phone}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="workshop-cta-new">
                    <a 
                      href="https://www.iseg-ggsd.com.ng" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn"
                      style={{ backgroundColor: workshop.color }}
                    >
                      Register for {workshop.code}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Sections */}
          <div className="workshop-additional-info">
            <div className="info-card">
              <h3>💼 Scholarship Opportunities</h3>
              <p>
                The organizing committee welcomes grants by organizations or individuals to support scholarships 
                for students and professionals who cannot afford the registration fees for training workshops.
              </p>
              <p className="highlight">
                <strong>To Apply for Scholarship:</strong> Contact the workshop coordinators or email the organizing committee
              </p>
            </div>

            <div className="info-card">
              <h3>🎓 Expert Instructors</h3>
              <p>
                All workshops are led by recognized experts and professionals in their respective fields. 
                Detailed instructor profiles and course materials will be provided upon registration completion.
              </p>
              <p className="highlight">
                <strong>Interested instructors?</strong> Contact: <a href="mailto:yunusamisbahu@gmail.com">yunusamisbahu@gmail.com</a> 
                <br/>(Deadline: May 31, 2026)
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Workshops
