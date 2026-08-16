import './Schedule.css'

const Schedule = () => {
  // Generate calendar grid for February 2027
  const startDay = 0 // February 1, 2027 starts on Monday (0)
  const daysInMonth = 28
  const calendarDays = []

  // Add empty days for previous month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null)
  }
  // Add days of August
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  // Events mapped to dates (Updated with correct schedule for February 2027)
  const events = {
    14: [
      { title: 'Arrival of Participants', type: 'event' }
    ],
    15: [
      { title: 'Opening Ceremony', type: 'special' },
      { title: 'Keynote Presentations', type: 'event' },
      { title: 'Regular Session Presentations', type: 'event' },
      { title: 'Leadership Recognition', type: 'special' }
    ],
    16: [
      { title: 'Forums and Special Sessions', type: 'event' },
      { title: 'Regular Session Presentations', type: 'event' },
      { title: 'Discussion Panels', type: 'event' }
    ],
    17: [
      { title: 'Safari Tour - Nairobi National Park', type: 'course' },
      { title: 'Museum and City Tour', type: 'course' }
    ],
    18: [
      { title: 'Forums and Special Sessions', type: 'event' },
      { title: 'Regular Session Presentations', type: 'event' },
      { title: 'Discussion Panels and Forums', type: 'event' }
    ],
    19: [
      { title: 'Regular Session Presentations', type: 'event' },
      { title: 'Special Sessions', type: 'special' },
      { title: 'Closing Ceremony and Dinner', type: 'special' }
    ],
    20: [
      { title: 'Training Workshops (TW.1-TW.6)', type: 'course' },
      { title: 'Short Courses', type: 'course' },
      { title: 'BrownBard International Cultural Festival', type: 'special' }
    ],
    21: [
      { title: 'Training Workshops', type: 'course' },
      { title: 'Short Courses', type: 'course' }
    ],
    22: [
      { title: 'Training Workshops (TW.7-TW.13)', type: 'course' },
      { title: 'Short Courses', type: 'course' }
    ],
    23: [
      { title: 'Training Workshops', type: 'course' },
      { title: 'Course Completion Certificates', type: 'special' }
    ]
  }

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Symposium Schedule</h1>
          <p>IMEG-GSD 2027 Mega Symposium</p>
        </div>
      </section>

      <section className="section">
        <div className="schedule-container">
          <div className="calendar-wrapper">
            <div className="calendar-header">
              <h2>February 2027</h2>
            </div>

            <div className="calendar">
              {/* Weekday headers */}
              {weekdays.map((day) => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${!day ? 'empty' : ''} ${
                    day && events[day] ? 'event-day' : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className={`day-number ${events[day] ? 'has-event' : ''}`}>
                        {day}
                        {events[day] && (
                          <span className="event-indicator"></span>
                        )}
                      </div>
                      {events[day] && (
                        <ul className="day-events">
                          {events[day].map((event, i) => (
                            <li
                              key={i}
                              className={`day-event ${event.type}`}
                              title={event.title}
                            >
                              {event.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-color event"></div>
                <span>Main Events</span>
              </div>
              <div className="legend-item">
                <div className="legend-color course"></div>
                <span>Workshops, Courses & Tours</span>
              </div>
              <div className="legend-item">
                <div className="legend-color special"></div>
                <span>Special Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <h2>MEGA SYMPOSIUM STRUCTURE AND SCHEDULE</h2>
          
          <div className="schedule-info" style={{ marginBottom: '2rem' }}>
            <h3>PART A</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 1, Saturday, February 14, 2027</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>Arrival of participants</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 2, Monday, August 10, 2026</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>On-Site Registration for Part A</li>
                <li>Opening Ceremony for Part A</li>
                <li>Keynote Presentations</li>
                <li>Parallel Session Presentations</li>
                <li>Council Meeting (evening)</li>
                <li>Council Elections (evening)</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 3, Tuesday, August 11, 2026</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>Paper Presentations In Parallel Sessions</li>
                <li>Poster Papers</li>
                <li>Awards And Prizes</li>
                <li>Part A Closing Dinner</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 4, Wednesday, August 12, 2026</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>Mid-career Engagement and Training Workshop for African Professionals (8:30 AM – 4:00 PM daily)</li>
                <li>Safari Tour of the Nairobi National Park (6 AM - 12 Noon)</li>
                <li>Organized lunch in Nairobi (12 noon)</li>
                <li>Tour of Nairobi National Museum (3-5pm)</li>
              </ul>
            </div>
          </div>

          <div className="schedule-info" style={{ marginBottom: '2rem' }}>
            <h3>PART B</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 5, Thursday, August 13, 2026</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>On-site Registration for Part B</li>
                <li>Opening Ceremony for Part B</li>
                <li>Relaunching of the Global Alliance for Disaster Reduction (GADR)</li>
                <li>Keynote Presentations</li>
                <li>Parallel Session Presentations</li>
                <li>Mid-career Engagement and Training Workshop for African Professionals (8:30 AM – 4:00 PM daily)</li>
                <li>Exhibitions</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 6, Friday, August 14, 2026</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>Parallel and Poster Session Presentations</li>
                <li>Discussion Panels and Forums</li>
                <li>Special Sponsored Sessions</li>
                <li>Exhibitions Continued</li>
                <li>Mid-career Engagement and Training Workshop for African Professionals (8:30 AM – 4:00 PM daily)</li>
                <li>Global Youth Sustainable Development Forum (GYSDF)</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 7, Friday, February 19, 2027</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>Safari Tour - Nairobi National Park (6 AM - 12 Noon)</li>
                <li>Organized Lunch in Nairobi (12 Noon)</li>
                <li>Training Workshop TW.1: Oil and Gas Industry Training (8:30 AM - 4:30 PM)</li>
                <li>National Museum Tour (3-5 PM)</li>
                <li>BrownBard International Cultural and Literary Festival (BICLF) (2:00 PM - 11:00 PM)</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Day 8, Saturday, February 20, 2027</h4>
              <ul style={{ marginLeft: '1rem' }}>
                <li>Training Workshop TW.2: Global South Mid-Career Training (8:30 AM - 4:30 PM)</li>
                <li>Short Courses (All Day)</li>
              </ul>
            </div>
          </div>

          <h2>Key Conference Dates</h2>
          <div className="dates-timeline">
            <div className="timeline-item">
              <span className="date">Aug 30, 2025</span>
              <p>Release of Internal Bulletin 2</p>
            </div>
            <div className="timeline-item">
              <span className="date">Oct 10, 2025</span>
              <p>Release of Bulletin 3: Call for Abstracts, Sponsored-Session Proposals and Exhibitions</p>
            </div>
            <div className="timeline-item">
              <span className="date">May 30, 2026</span>
              <p>Deadline for Sponsored-Session Proposals and Shortcourse Plans Submission</p>
            </div>
            <div className="timeline-item">
              <span className="date">May 31, 2026</span>
              <p>Expert Instructor Applications Deadline</p>
            </div>
            <div className="timeline-item">
              <span className="date">Jun 20, 2026</span>
              <p>Deadline for 4-Page Abstract Submission</p>
            </div>
            <div className="timeline-item">
              <span className="date">Jun 25, 2026</span>
              <p>Full Symposium Program Release - Bulletin 4.1</p>
            </div>
            <div className="timeline-item">
              <span className="date">Jun 30, 2026</span>
              <p>Early Registration Deadline (Suggested)</p>
            </div>
            <div className="timeline-item">
              <span className="date">Jul 4, 2026</span>
              <p>Shortcourse Registration Deadline</p>
            </div>
            <div className="timeline-item">
              <span className="date">Aug 1, 2026</span>
              <p>Regular Registration Deadline</p>
            </div>
            <div className="timeline-item">
              <span className="date">Aug 5, 2026</span>
              <p>Hotel Booking Deadline for Special Rates</p>
            </div>
            <div className="timeline-item highlight">
              <span className="date">Aug 9-16, 2026</span>
              <p>IMEG-GSD 2027 Mega Symposium (8 Days) - Maanzoni 680 Hotel, Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <h2>Mega Symposium Planning Calendar</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.1rem' }}>Complete timeline of activities and important dates</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderRight: '1px solid #ddd' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Activity / Milestone</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 30, 2025</td>
                  <td style={{ padding: '1rem' }}>Release of Internal Bulletin 2</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Oct 10, 2025</td>
                  <td style={{ padding: '1rem' }}>Release of Bulletin 3: Call for Abstracts, Sponsored-Session Proposals and Exhibitions</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Apr 30, 2026</td>
                  <td style={{ padding: '1rem' }}>Deadline for Online Submission of 4-Page Abstracts using Specified Format</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Apr 30, 2026</td>
                  <td style={{ padding: '1rem' }}>Deadline for Submission of Sponsored-Session Proposals</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Apr 30, 2026</td>
                  <td style={{ padding: '1rem' }}>Deadline for Submission of Exhibition Plans and Registration</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Jun 15, 2026</td>
                  <td style={{ padding: '1rem' }}>Production of Mega Symposium Program and Call for Registration – Bulletin 4</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 1, 2026</td>
                  <td style={{ padding: '1rem' }}>Deadline for Regular Registration • Deadline for Registration for Shortcourses. (https://www.imeg-gsd.com.ng/)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff3e0' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 9, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 1 (Part A):</strong> Arrival of participants</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff3e0' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 10, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 2:</strong> On-Site Registration, Opening Ceremony, Keynote Presentations, Parallel Sessions, Council Meeting, Council Elections</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff3e0' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 11, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 3:</strong> Paper Presentations, Poster Papers, Awards and Prizes, Closing Dinner</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#e8f5e9' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 12, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 4:</strong> Mid-career Engagement Workshop (8:30-4:00), Safari Tour (6AM-12PM), Organized Lunch, Nairobi Museum Tour (3-5PM)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff3e0' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 13, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 5 (Part B):</strong> On-site Registration, Opening Ceremony, GADR Relaunch, Keynotes, Parallel Sessions, Mid-career Workshop, Exhibitions</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff3e0' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 14, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 6 (Part B):</strong> Parallel/Poster Sessions, Discussion Panels, Sponsored Sessions, Exhibitions, Mid-career Workshop, GYSDF</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff3e0' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 15, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 7:</strong> BrownBard International Cultural and Literary Festival (BICLF)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff3e0' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Aug 16, 2026</td>
                  <td style={{ padding: '1rem' }}><strong>Day 8:</strong> Short Courses</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>
            <strong>Website:</strong> <a href="https://www.imeg-gsd.com.ng/" target="_blank" rel="noopener noreferrer">https://www.imeg-gsd.com.ng/</a>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Schedule