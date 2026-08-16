import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Workshops.css'

const Workshops = () => {
  const [expandedCoursesIndex, setExpandedCoursesIndex] = useState(null)
  const workshops = [
    {
      id: 'tw1',
      code: 'TW.1',
      title: 'OIL AND GAS INDUSTRY TRAINING WORKSHOP',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:00 AM - 5:00 PM',
      fee: 'USD $3,000',
      color: '#e67e22',
      coordinators: [
        { name: 'Mr. James Eneji Odey', email: 'jamesodey2015@gmail.com' },
        { name: 'Mr. Emmanuel Udede', email: 'emman.udedeh@gmail.com' }
      ],
      description: 'The courses listed below constitute TW.1 the oil and gas industrial training workshop. Course contents will be provided in the final program. Enrolled Trainees will also participate free of charge in the forum FA.9 on Innovations and Opportunities in the Oil and Gas Industry.',
      courses: [
        { code: 'TW.1A', title: 'Gas Power Generation and Infrastructure Geotechnics' },
        { code: 'TW.1B', title: 'Principles and Practice of Exploration Geophysics for Oil and Gas' },
        { code: 'TW.1C', title: 'Clean Energy and Renewable Technologies' },
        { code: 'TW.1D', title: 'Oil Midstream and Downstream Processing' },
        { code: 'TW.1E', title: 'Oil Upstream Operations and Production' },
        { code: 'TW.1F', title: 'Analysis and Control of Oil Spills' }
      ],
      bonusForum: 'Forum FA.9 - Innovations and Opportunities in the Oil and Gas Industry (Free for enrolled trainees)',
      featured: true
    },
    {
      id: 'tw2',
      code: 'TW.2',
      title: 'GLOBAL SOUTH MID-CAREER TRAINING WORKSHOP',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:00 AM - 5:00 PM',
      fee: 'USD $2,000',
      color: '#2ecc71',
      coordinators: [
        { name: 'Dr. Daniel Nyanganyura', email: 'daniel.nyanganyura@ru.ac.za' },
        { name: 'Ms. Esther Ogunjobi', email: 'estheroluwabunmi222@gmail.com' }
      ],
      description: 'The course listed below constitute TW.2 Global South Mid-Career Training Workshop. Course contents will be provided in the final program. Enrolled Trainees will also participate free of charge in Forum FA.14- Forum on ICT and Artificial Intelligence (AI) for Sustainable Development.',
      courses: [
        { code: 'TW.2A', title: 'Galvanizing the Blue Economy' },
        { code: 'TW.2B', title: 'Critical Minerals for Africa\'s Industrial Future' },
        { code: 'TW.2C', title: 'Governance and Institutional Systems' },
        { code: 'TW.2D', title: 'Innovative Financing for Development' },
        { code: 'TW.2E', title: 'Remote Sensing and Geospatial Intelligence' },
        { code: 'TW.2F', title: 'Emerging Technologies and the Digital Economy' }
      ],
      bonusForum: 'Forum FA.14 - ICT and Artificial Intelligence (AI) for Sustainable Development (Free for enrolled trainees)',
      featured: false
    },
    {
      id: 'tw3',
      code: 'TW.3',
      title: 'TRAINING WORKSHOP ON EXECUTIVE LEADERSHIP, PUBLIC HEALTH AND WATER SECURITY',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:00 AM - 5:00 PM',
      fee: 'USD $2,500',
      color: '#3498db',
      coordinators: [
        { name: 'Dr. Chukwumezie Okolo', email: 'drmezieokolo@gmail.com', phone: '+234 916 065 1776' },
        { name: 'Pharm. Beatrice Obiageli Mbah', email: 'bettyobby@gmail.com', phone: '+234 818 818 8623' }
      ],
      description: 'The Courses listed below constitute TW.3, the Training Workshop on Executive Leadership, Public Health and Water Security. Course contents will be provided in the final program. Enrolled trainees will also participate free of charge in Forum FB.10 - Forum on Drinking Water and Public Health.',
      courses: [
        { code: 'TW.3A', title: 'Drinking Water Quality, Public Health and Disease Preventions' },
        { code: 'TW.3B', title: 'Environmental Health Governance and Policy Implementation' },
        { code: 'TW.3C', title: 'Evidence Appraisal for Decision Making in Sustainable Development' },
        { code: 'TW.3D', title: 'Systems thinking and Strategic Leadership' },
        { code: 'TW.3E', title: 'Emotional Intelligence and Critical Thinking for Professional Development' }
      ],
      bonusForum: 'Forum FB.10 - Forum on Drinking Water and Public Health (Free for enrolled trainees)',
      featured: false
    },
    {
      id: 'tw4',
      code: 'TW.4',
      title: 'TRAINING WORKSHOP ON ARTIFICIAL INTELLIGENCE, CYBERSECURITY AND INTERNET OF THINGS',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:00 AM - 5:00 PM',
      fee: 'USD $3,000',
      color: '#9b59b6',
      coordinators: [
        { name: 'Mr. Marshall Anako', email: 'marshallanako@gmail.com', phone: '+1 623 570 8306' },
        { name: 'Mr. Misbahu Yunusa Yusuf', email: 'yunusamisbahu@gmail.com', phone: '+234 813 078 1117' },
        { name: 'Mr. John Jaiyeolah', email: 'jaiyeolah.john@gmail.com', phone: '+234 703 879 8756' },
        { name: 'Mr. Daniel Ahijah', email: 'danielahijah10@gmail.com', phone: '+234 706 362 3026' },
        { name: 'Mr. Ezi Tsogli', email: 'ezitsogli1@gmail.com', phone: '+1 980 636 3644' }
      ],
      description: 'The courses listed below constitute TW.4, the Training Workshop on Artificial Intelligence, Cybersecurity and Internet of Things. Course contents will be provided in the final program. Enrolled trainees will also participate free of charge in Forum FA.14 - Forum on ICT and Artificial Intelligence (AI) for Sustainable Development.',
      courses: [
        { code: 'TW.4A', title: 'Database Management Systems' },
        { code: 'TW.4B', title: 'Fundamentals of Cybersecurity' },
        { code: 'TW.4C', title: 'Basic Elements and Utilities of Artificial Intelligence (AI)' },
        { code: 'TW.4D', title: 'Systems thinking and Strategic Organizational Leadership' },
        { code: 'TW.4E', title: 'AI Applications in Management Systems' }
      ],
      bonusForum: 'Forum FA.14 - Forum on ICT and Artificial Intelligence (AI) for Sustainable Development (Free for enrolled trainees)',
      featured: false
    },
    {
      id: 'tw5',
      code: 'TW.5',
      title: 'GISDAAD TRAINING WORKSHOP ON BUSINESS DEVELOPMENT AND OPERATIONS',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:00 AM - 5:00 PM',
      fee: 'USD $3,000',
      color: '#e74c3c',
      coordinators: [
        { name: 'Dr. Mathias Fonkam', email: 'mfonkam@gmail.com', phone: '+1 267 475 0402' },
        { name: 'Chief Joseph Akpan', email: 'joeakpaninyang@gmail.com', phone: '+234 814 344 0365' },
        { name: 'Mrs. Cornelia Akpan', email: 'corneliaakpan497@gmail.com', phone: '+234 803 361 5947' },
        { name: 'Ms. Evin Umanah', email: 'evin.gisdaad@gmail.com', phone: '+234 802 331 0809' },
        { name: 'Prof. Bassey Ndon', email: 'basseyndon2013@gmail.com', phone: '+234 802 795 7808' }
      ],
      description: 'The courses listed below constitute TW.5, the Training Workshop on Business Development and Operations. Course contents will be provided in the final program.',
      courses: [
        { code: 'TW.5A', title: 'Standardization and Quality Control Methods in Business Operations' },
        { code: 'TW.5B', title: 'Competitiveness Building Measures for Various SME/SMI Industrial Sectors' },
        { code: 'TW.5C', title: 'AI and Cyber Applications in Management and Industrial Systems' },
        { code: 'TW.5D', title: 'Smart Manufacturing and Production Efficiency for SMEs and SMIs' },
        { code: 'TW.5E', title: 'Principles and Processes of Business Plan Development' },
        { code: 'TW.5F', title: 'Principles of Project Management' },
        { code: 'TW.5G', title: 'Critical Crops for Agribusiness in Sub-Saharan Africa' }
      ],
      bonusForum: 'Comprehensive business development and operations curriculum',
      featured: false
    },
    {
      id: 'tw6',
      code: 'TW.6',
      title: 'TRAINING WORKSHOP ON EDUCATION AND RESEARCH ADMINISTRATION',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:00 AM - 5:00 PM',
      fee: 'USD $3,000',
      color: '#16a085',
      coordinators: [
        { name: 'Prof. Sharizad Dahlan', email: 'sharizad@istic-unesco.org', phone: '+603 2698 4540' },
        { name: 'Mr. Bonny Alaneme', email: 'bonglotech@gmail.com', phone: '+234 803 601 1274' },
        { name: 'Ms. Chinatu Orji', email: 'chinatuorji78@gmail.com', phone: '+234 813 510 0015' },
        { name: 'Mrs. Helen Ajuzieogu', email: 'helen.gisdaad@gmail.com', phone: '+234 806 394 7292' }
      ],
      description: 'The courses listed below constitute TW.6, the Training Workshop on Education and Research Administration. Course contents will be provided in the final program.',
      courses: [
        { code: 'TW.6A', title: 'Intellectual Property Law Principles and Practices.' },
        { code: 'TW.6B', title: 'Management of Research and Educational Organizations.' },
        { code: 'TW.6C', title: 'Principles and Processes of Business Plan Development' },
        { code: 'TW.6D', title: 'Research Program, Proposals Development and Marketing Processes' },
        { code: 'TW.6E', title: 'Structuring of New Universities for Intellectual Growth and Entrepreneurship' },
        { code: 'TW.6F', title: 'Systems Thinking and Strategic Organizational Leadership' },
        { code: 'TW.6G', title: 'Emotional Intelligence and Critical Thinking for Professional Development' },
        { code: 'TW.6H', title: 'Internationalization Techniques for Universities' }
      ],
      bonusForum: 'Advanced education and research management curriculum',
      featured: false
    },
    {
      id: 'tw7',
      code: 'TW.7',
      title: 'WORKSHOP ON CLIMATE CHANGE, SUSTAINABLE ENERGY SYSTEMS AND CARBON CREDITS',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:30 AM - 5:30 PM',
      fee: 'USD $3,000',
      color: '#27ae60',
      coordinators: [
        { name: 'Dr. John Osonwa', email: 'johnosonwa@gmail.com', phone: '+234 806 745 2227' },
        { name: 'Prof. Hilary I. Inyang', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' }
      ],
      description: 'The course listed below constitute TW.7 Workshop on Climate Change, Sustainable Energy Systems and Carbon Credits. Course contents will be provided in the final program. Enrolled Trainees will also participate free of charge in Forum FA.15- Forum on Climate Change on the Environment and Livelihood Impacts.',
      courses: [
        { code: 'TW.7A', title: 'Climate Change Policies and Governance Systems' },
        { code: 'TW.7B', title: 'Technical Systems for Climate Change Mitigation and Adaptation' },
        { code: 'TW.7C', title: 'Climate Change Vulnerability and Resilience Indexing' },
        { code: 'TW.7D', title: 'Natural Disasters' },
        { code: 'TW.7E', title: 'Remote Sensing Systems for Environmental Application' },
        { code: 'TW.7F', title: 'Renewable Energy Systems' },
        { code: 'TW.7G', title: 'Fundamentals of Carbon Markets, Carbon Credits and Opportunities' }
      ],
      bonusForum: 'Forum FA.15 - Forum on Climate Change on the Environment and Livelihood Impacts (Free for enrolled trainees)',
      featured: false
    },
    {
      id: 'tw8',
      code: 'TW.8',
      title: 'WORKSHOP ON LAW AND GOVERNANCE PROCESSES',
      date: 'Saturday, February 20 - Sunday, February 21, 2027',
      time: '8:30 AM - 5:30 PM',
      fee: 'USD $2,500',
      color: '#c0392b',
      coordinators: [
        { name: 'Prof. Cyprian Edward-Ekpo', email: 'cyprian.edward@ilawdun.us', phone: '+234 803 896 6860' },
        { name: 'Dr. Mike Essien', email: 'messien@essienlaw.com', phone: '+1 612 963 7329' },
        { name: 'Mr. Sonnie A. Braih', email: 'sbraih@gmail.com', phone: '+1 763 477 2206' }
      ],
      description: 'The course listed below constitute TW.8 Workshop on Law and Governance Processes. Course contents will be provided in the final program. Enrolled Trainees will also participate free of charge in FB.7 Forum on Legal Systems, Governance and Sustainable Development.',
      courses: [
        { code: 'TW.8A', title: 'Elements of Environmental Law' },
        { code: 'TW.8B', title: 'Intellectual Property and Associated Legal Support Systems' },
        { code: 'TW.8C', title: 'Court Administration Processes' },
        { code: 'TW.8D', title: 'Fundamentals of Human Right Laws' },
        { code: 'TW.8E', title: 'Social Equity and Labor Rights in Public and Private Agencies' }
      ],
      bonusForum: 'Forum FB.7 - Forum on Legal Systems, Governance and Sustainable Development (Free for enrolled trainees)',
      featured: false
    }
  ]

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Training Workshops</h1>
          <p>Advanced Professional Development at IMEG-GSD 2027</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Intro Section */}
          <div className="workshops-intro-section">
            <div className="intro-content">
              <h2>TRAINING WORKSHOPS OF THE IMEG-GSD 2027 MEGA-SYMPOSIUM</h2>
              <p>
                The International Organizing Committee of IMEG-GSD 2027 Mega Symposium has made arrangements with international organizations for training workshops to be held in parallel from 8:00 AM on Saturday, February 20th to 5:00 PM on Tuesday, February 23rd, 2027 during the Mega-Symposium.
              </p>
              <p>
                Each of the training workshops comprises courses that pertain to the workshop program issue. To ensure a balanced theoretical and practical course contents, each planning organization has collaborated with GISDAAD to optimize the coverage. Workshop completion certificates will be provided to all trainees at the end of each completed training workshop.
              </p>
              <p>
                Complete information on instructor biosketches as well as course contents will be provided in the Mega-Symposium program document which will be released June 25, 2026. Individuals and organizations who are interested in enrolment in the training workshop and need general information about the training workshop program as well as other elements of the conference should contact the coordinator, Mr. Misbahu Yunusa Yusuf, Email: <strong>yunusamisbahu@gmail.com</strong>, Telephone: <strong>+234 813 078 1117</strong>.
              </p>
              <p>
                For more detailed and specific information on any of the training workshops listed below, the inquirer is requested to contact the listed coordinators whose name and contact information are provided below. Training workshop enrolment fees are indicated. Registration as well as payment can be made at <strong>https://www.imeg-gsd.com.ng/workshops</strong>.
              </p>
              <div className="key-info">
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <div>
                    <strong>Schedule</strong>
                    <p>Saturday, February 20 - Sunday, February 21, 2027</p>
                    <p>8:00 AM - 5:00 PM</p>
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
                  <span className="info-icon">🎓</span>
                  <div>
                    <strong>Certificates</strong>
                    <p>Completion certificates provided for all trainees</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">💷</span>
                  <div>
                    <strong>Fee Waiver</strong>
                    <p>Part B registration fee waiver (USD $350)</p>
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
                  {/* Header with Workshop Code and Full Title */}
                  <div className="workshop-header-new">
                    <div className="workshop-code-badge">{workshop.code}</div>
                    <h3 className="workshop-title-display">{workshop.title}</h3>
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
                    <Link
                      to={`/register?workshop=${encodeURIComponent(workshop.code)}`}
                      className="btn"
                      style={{ backgroundColor: workshop.color }}
                    >
                      Register for {workshop.code}
                    </Link>
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
