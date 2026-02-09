import './Schedule.css'

const Schedule = () => {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Symposium Schedule</h1>
          <p>14th ISEG/GGSD Mega Symposium 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Part A: Environmental Geotechnology (Aug 9-11)</h2>

          <div className="schedule-item">
            <div className="day-header">
              <span className="day-number">Day 1</span>
              <span className="day-date">Sunday, August 9, 2026</span>
            </div>
            <div className="events">
              <div className="event">
                <div className="time">Afternoon</div>
                <div className="event-details">
                  <h3>Arrival of Participants</h3>
                  <p>Check-in at University of Nairobi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="schedule-item">
            <div className="day-header">
              <span className="day-number">Day 2</span>
              <span className="day-date">Monday, August 10, 2026</span>
            </div>
            <div className="events">
              <div className="event">
                <div className="time">08:00 - 09:00</div>
                <div className="event-details">
                  <h3>On-Site Registration for Part A</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">09:00 - 10:00</div>
                <div className="event-details">
                  <h3>Opening Ceremony for Part A</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">10:00 - 12:30</div>
                <div className="event-details">
                  <h3>Keynote Presentations</h3>
                  <p>Experts from around the world sharing insights on environmental geotechnology</p>
                </div>
              </div>
              <div className="event">
                <div className="time">12:30 - 13:30</div>
                <div className="event-details">
                  <h3>Lunch Break</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">13:30 - 17:00</div>
                <div className="event-details">
                  <h3>Parallel Session Presentations</h3>
                  <p>Multiple tracks covering different topics in environmental geotechnology</p>
                </div>
              </div>
              <div className="event">
                <div className="time">18:00 - 20:00</div>
                <div className="event-details">
                  <h3>ISEG Council Meeting & Elections (Evening)</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="schedule-item">
            <div className="day-header">
              <span className="day-number">Day 3</span>
              <span className="day-date">Tuesday, August 11, 2026</span>
            </div>
            <div className="events">
              <div className="event">
                <div className="time">08:30 - 12:00</div>
                <div className="event-details">
                  <h3>Paper Presentations in Parallel Sessions</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">12:00 - 13:30</div>
                <div className="event-details">
                  <h3>Lunch Break</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">13:30 - 16:00</div>
                <div className="event-details">
                  <h3>Poster Sessions</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">16:00 - 17:30</div>
                <div className="event-details">
                  <h3>ISEG Awards and Prizes Ceremony</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">19:00 - 22:00</div>
                <div className="event-details">
                  <h3>Part A Closing Dinner</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="schedule-item">
            <div className="day-header">
              <span className="day-number">Day 4</span>
              <span className="day-date">Wednesday, August 12, 2026</span>
            </div>
            <div className="events">
              <div className="event">
                <div className="time">06:00 - 12:00</div>
                <div className="event-details">
                  <h3>Safari Tour</h3>
                  <p>Nairobi National Park tour (6am-12 noon)</p>
                </div>
              </div>
              <div className="event">
                <div className="time">12:00 - 13:30</div>
                <div className="event-details">
                  <h3>Organized Lunch in Nairobi</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">15:00 - 17:00</div>
                <div className="event-details">
                  <h3>Nairobi National Museum Visit</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <h2>Part B: Global Geo-Ecosystems & Sustainable Development (Aug 13-15)</h2>

          <div className="schedule-item">
            <div className="day-header">
              <span className="day-number">Day 5</span>
              <span className="day-date">Thursday, August 13, 2026</span>
            </div>
            <div className="events">
              <div className="event">
                <div className="time">08:00 - 09:00</div>
                <div className="event-details">
                  <h3>On-Site Registration for Part B</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">09:00 - 10:00</div>
                <div className="event-details">
                  <h3>Opening Ceremony for Part B & GADR Relaunch</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">10:00 - 12:30</div>
                <div className="event-details">
                  <h3>Keynote Presentations</h3>
                  <p>Expert presentations on sustainable development and geo-ecosystems</p>
                </div>
              </div>
              <div className="event">
                <div className="time">12:30 - 13:30</div>
                <div className="event-details">
                  <h3>Lunch Break</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">13:30 - 17:00</div>
                <div className="event-details">
                  <h3>Parallel Sessions & Exhibitions</h3>
                  <p>Multiple tracks and exhibitions showcasing sustainable development solutions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="schedule-item">
            <div className="day-header">
              <span className="day-number">Day 6</span>
              <span className="day-date">Friday, August 14, 2026</span>
            </div>
            <div className="events">
              <div className="event">
                <div className="time">08:30 - 12:00</div>
                <div className="event-details">
                  <h3>Parallel & Poster Sessions</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">12:00 - 13:30</div>
                <div className="event-details">
                  <h3>Lunch Break</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">13:30 - 16:00</div>
                <div className="event-details">
                  <h3>Panels & Forums</h3>
                  <p>Interactive discussions on key sustainable development topics</p>
                </div>
              </div>
              <div className="event">
                <div className="time">16:00 - 17:30</div>
                <div className="event-details">
                  <h3>Sponsored Sessions</h3>
                </div>
              </div>
              <div className="event">
                <div className="time">19:00 - 22:00</div>
                <div className="event-details">
                  <h3>Cultural Night & Closing Dinner</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="schedule-item">
            <div className="day-header">
              <span className="day-number">Day 7</span>
              <span className="day-date">Saturday, August 15, 2026</span>
            </div>
            <div className="events">
              <div className="event">
                <div className="time">08:00 - 17:00</div>
                <div className="event-details">
                  <h3>Short Courses & Training Program</h3>
                  <p>Optional hands-on training and professional development courses</p>
                  <ul className="courses-list">
                    <li>Geotechnical Engineering Fundamentals</li>
                    <li>Advanced Remediation Techniques</li>
                    <li>Climate Change & Environmental Geotechnics</li>
                    <li>GIS Applications in Geotechnology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
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
