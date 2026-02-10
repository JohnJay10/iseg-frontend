import './Schedule.css'

const Schedule = () => {
  // Generate calendar grid for August 2026
  const startDay = 5 // August 1, 2026 starts on Saturday (5)
  const daysInMonth = 31
  const calendarDays = []

  // Add empty days for previous month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null)
  }
  // Add days of August
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  // Events mapped to dates
  const events = {
    9: [
      { title: 'Arrival of Participants', type: 'event' },
      { title: 'Check-in at University of Nairobi', type: 'event' }
    ],
    10: [
      { title: 'On-Site Registration Part A', type: 'event' },
      { title: 'Opening Ceremony Part A', type: 'event' },
      { title: 'Keynote Presentations', type: 'event' },
      { title: 'Parallel Sessions', type: 'event' },
      { title: 'ISEG Council Meeting', type: 'special' }
    ],
    11: [
      { title: 'Paper Presentations', type: 'event' },
      { title: 'Poster Sessions', type: 'event' },
      { title: 'ISEG Awards Ceremony', type: 'special' },
      { title: 'Part A Closing Dinner', type: 'event' }
    ],
    12: [
      { title: 'Safari Tour - Nairobi NP', type: 'course' },
      { title: 'Organized Lunch', type: 'event' },
      { title: 'Nairobi National Museum', type: 'course' }
    ],
    13: [
      { title: 'On-Site Registration Part B', type: 'event' },
      { title: 'Opening Ceremony Part B', type: 'event' },
      { title: 'Keynote Presentations', type: 'event' },
      { title: 'Parallel Sessions', type: 'event' }
    ],
    14: [
      { title: 'Parallel & Poster Sessions', type: 'event' },
      { title: 'Panels & Forums', type: 'event' },
      { title: 'Sponsored Sessions', type: 'event' },
      { title: 'Cultural Night & Dinner', type: 'special' }
    ],
    15: [
      { title: 'Short Courses & Training', type: 'course' },
      { title: 'Professional Development', type: 'course' }
    ]
  }

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Symposium Schedule</h1>
          <p>14th ISEG/GGSD Mega Symposium 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="schedule-container">
          <div className="calendar-wrapper">
            <div className="calendar-header">
              <h2>August 2026</h2>
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
                <span>Courses & Tours</span>
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
          <h2>Key Conference Dates</h2>
          <div className="dates-timeline">
            <div className="timeline-item">
              <span className="date">Aug 30, 2025</span>
              <p>Release of Internal Bulletin 2</p>
            </div>
            <div className="timeline-item">
              <span className="date">Oct 10, 2025</span>
              <p>Release of Bulletin 3: Call for Abstracts</p>
            </div>
            <div className="timeline-item">
              <span className="date">Mar 30, 2026</span>
              <p>Deadline for Abstract Submissions</p>
            </div>
            <div className="timeline-item">
              <span className="date">May 30, 2026</span>
              <p>Program Release & Registration Opens</p>
            </div>
            <div className="timeline-item">
              <span className="date">Jun 30, 2026</span>
              <p>Deadline for Regular Registration</p>
            </div>
            <div className="timeline-item highlight">
              <span className="date">Aug 9-15, 2026</span>
              <p>ISEG/GGSD Mega Symposium</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Schedule
