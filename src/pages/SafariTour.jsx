import { useState } from 'react'
import './SafariTour.css'

// Nairobi National Park images
import nairobiPark1 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture1.jpg'
import nairobiPark2 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture2.jpg'
import nairobiPark3 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture3.jpg'
import nairobiPark4 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture4.jpg'
import nairobiPark5 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture5.jpg'
import nairobiPark6 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture6.jpg'
import nairobiPark7 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture7.jpg'
import nairobiPark8 from '../images/SAFARI TOUR/NAIROBI_NATIONAL_PARK/Picture8.jpg'

// David Sheldrick images
import davidSheldrick9 from '../images/SAFARI TOUR/DAVID SHELDRICK/Picture9.jpg'
import davidSheldrick10 from '../images/SAFARI TOUR/DAVID SHELDRICK/Picture10.jpg'
import davidSheldrick11 from '../images/SAFARI TOUR/DAVID SHELDRICK/Picture11.jpg'
import davidSheldrick12 from '../images/SAFARI TOUR/DAVID SHELDRICK/Picture12.jpg'
import davidSheldrick13 from '../images/SAFARI TOUR/DAVID SHELDRICK/Picture13.jpg'

// Giraffe Centre images
import giraffe14 from '../images/SAFARI TOUR/GIRAFFE CENTRE/Picture14.jpg'
import giraffe15 from '../images/SAFARI TOUR/GIRAFFE CENTRE/Picture15.jpg'
import giraffe16 from '../images/SAFARI TOUR/GIRAFFE CENTRE/Picture16.jpg'
import giraffe17 from '../images/SAFARI TOUR/GIRAFFE CENTRE/Picture17.jpg'
import giraffe18 from '../images/SAFARI TOUR/GIRAFFE CENTRE/Picture18.jpg'

// Museum images
import museum19 from '../images/SAFARI TOUR/Nairobi National Museum/Picture19.jpg'
import museum20 from '../images/SAFARI TOUR/Nairobi National Museum/Picture20.jpg'
import museum21 from '../images/SAFARI TOUR/Nairobi National Museum/Picture21.jpg'
import museum22 from '../images/SAFARI TOUR/Nairobi National Museum/Picture22.jpg'
import museum23 from '../images/SAFARI TOUR/Nairobi National Museum/Picture23.jpg'

// Bomas images
import bomas24 from '../images/SAFARI TOUR/Bomas of Kenya/Picture24.jpg'
import bomas25 from '../images/SAFARI TOUR/Bomas of Kenya/Picture25.jpg'
import bomas26 from '../images/SAFARI TOUR/Bomas of Kenya/Picture26.jpg'
import bomas27 from '../images/SAFARI TOUR/Bomas of Kenya/Picture27.jpg'
import bomas28 from '../images/SAFARI TOUR/Bomas of Kenya/Picture28.jpg'
import bomas29 from '../images/SAFARI TOUR/Bomas of Kenya/Picture29.jpg'

// Karen Blixen images
import karen30 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture30.jpg'
import karen31 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture31.jpg'
import karen32 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture32.jpg'
import karen33 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture33.jpg'
import karen34 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture34.jpg'
import karen35 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture35.jpg'
import karen36 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture36.jpg'
import karen37 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture37.jpg'
import karen38 from '../images/SAFARI TOUR/Karen Blixen Museum/Picture38.jpg'

const SafariTour = () => {
  const tours = [
    {
      id: 1,
      title: 'Nairobi National Park',
      subtitle: 'Safari in the City',
      visitingHours: '6 AM - 10 AM',
      description:
        'Experience the wild just 7 km from downtown Nairobi! Nairobi National Park offers an unforgettable safari with lions, rhinos, giraffes, and over 400 bird species all set against the stunning city skyline. It\'s the only place in the world where you can see big game with skyscrapers in the background.',
      images: [nairobiPark1, nairobiPark2, nairobiPark3, nairobiPark4, nairobiPark5, nairobiPark6, nairobiPark7, nairobiPark8],
      highlights: ['Lions', 'Rhinos', 'Giraffes', '400+ Bird Species', 'City Skyline Views'],
      heroImg: nairobiPark1,
    },
    {
      id: 2,
      title: 'David Sheldrick Elephant Orphanage',
      subtitle: 'Up Close with Baby Elephants',
      visitingHours: '11 AM - 12 PM (Strictly)',
      description:
        'Meet rescued baby elephants at this heartwarming sanctuary inside Nairobi National Park. Watch them enjoy their daily mud baths and learn about their incredible journey from orphaned to rehabilitated.',
      images: [davidSheldrick9, davidSheldrick10, davidSheldrick11, davidSheldrick12, davidSheldrick13],
      highlights: ['Baby Elephants', 'Mud Baths', 'Rescue Stories', 'Education Programs'],
      heroImg: davidSheldrick9,
    },
    {
      id: 3,
      title: 'Giraffe Centre',
      subtitle: 'Feed and Greet Friendly Giants',
      visitingHours: '2 PM - 3 PM',
      description:
        'Get face to face with endangered Rothschild giraffes in Lang\'ata. Hand feed them from a platform, enjoy a nature walk, and even score a giraffe kiss. A perfect mix of fun and education for all ages.',
      images: [giraffe14, giraffe15, giraffe16, giraffe17, giraffe18],
      highlights: ['Hand Feeding', 'Rothschild Giraffes', 'Nature Walks', 'Photography'],
      heroImg: giraffe14,
    },
    {
      id: 4,
      title: 'Nairobi National Museum',
      subtitle: 'Explore Kenya\'s Story',
      visitingHours: '3 PM - 5 PM',
      description:
        'Step into Kenya\'s past with fascinating exhibits on fossils, wildlife, art, and culture. Don\'t miss the neighboring Snake Park for a close look at reptiles. Ideal for curious minds and history lovers.',
      images: [museum19, museum20, museum21, museum22, museum23],
      highlights: ['Fossils', 'Wildlife Exhibits', 'Art & Culture', 'Snake Park'],
      heroImg: museum20,
    },
    {
      id: 5,
      title: 'Bomas of Kenya',
      subtitle: 'Dance Through Culture',
      visitingHours: '2:30 PM - 4 PM',
      description:
        'Celebrate Kenya\'s vibrant heritage with thrilling traditional dance shows, music, and crafts. Tour life sized tribal homesteads and discover the lifestyles of Kenya\'s diverse ethnic communities all just minutes from the city center.',
      images: [bomas24, bomas25, bomas26, bomas27, bomas28, bomas29],
      highlights: ['Dance Shows', 'Traditional Music', 'Tribal Homesteads', 'Cultural Crafts'],
      heroImg: bomas24,
    },
    {
      id: 6,
      title: 'Karen Blixen Museum',
      subtitle: 'A Taste of Colonial Charm',
      visitingHours: '10 AM - 4 PM',
      description:
        'Visit the beautifully preserved former home of the "Out of Africa" author. Located in the serene suburb of Karen, this museum offers a glimpse into colonial life and the history of coffee farming in early 20th century Kenya.',
      images: [karen30, karen31, karen32, karen33, karen34, karen35, karen36, karen37, karen38],
      highlights: ['Colonial History', 'Out of Africa', 'Coffee Farming', 'Historic Architecture'],
      heroImg: karen30,
    },
  ]

  return (
    <main>
      {/* Hero Section with Image */}
      <section className="safari-hero" style={{ backgroundImage: `url(${tours[0].heroImg})` }}>
        <div className="safari-hero-overlay" />
        <div className="safari-hero-content">
          <h1 className="safari-hero-title">Safari Tour Experiences</h1>
          <p className="safari-hero-subtitle">Explore Nairobi Where City Life Meets Wild Adventure</p>
          <p className="safari-hero-description">
            Whether you're a wildlife lover, culture enthusiast, or history buff, Nairobi offers an unforgettable
            blend of natural beauty and rich heritage all in one vibrant city.
          </p>
          <p className="safari-cta-text">Start your memorable adventure today</p>
        </div>
      </section>

      {/* Discover Nairobi - Individual Sections */}
      <section className="discover-nairobi">
        <div className="container">
          <div className="section-intro">
            <h2>Discover Nairobi</h2>
            <p>Nairobi has it all – wildlife, culture, history, and charm</p>
          </div>
        </div>

        {/* Individual Attraction Sections */}
        {tours.map((tour, index) => (
          <div key={tour.id} className={`attraction-section ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className="container attraction-container">
              {/* Text Content */}
              <div className="attraction-content">
                <div className="attraction-number">{String(tour.id).padStart(2, '0')}</div>
                <h3 className="attraction-title">{tour.title}</h3>
                <p className="attraction-subtitle">{tour.subtitle}</p>

                <div className="attraction-visiting-hours">
                  <span className="hours-icon">⏰</span>
                  <span className="hours-text">{tour.visitingHours}</span>
                </div>

                <p className="attraction-description">{tour.description}</p>

                <div className="attraction-highlights">
                  {tour.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-badge">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Images Gallery Grid */}
              <div className="attraction-gallery">
                <div className="gallery-grid">
                  {tour.images.map((img, idx) => (
                    <div key={idx} className="gallery-item">
                      <img src={img} alt={`${tour.title} - ${idx + 1}`} />
                      <div className="gallery-overlay" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Info Section */}
      <section className="safari-info">
        <div className="container">
          <h2>Plan Your Safari Adventure</h2>
          <div className="info-cards">
            <div className="info-card">
              <span className="info-icon">🚗</span>
              <h3>Easy Access</h3>
              <p>All attractions are conveniently located within Nairobi, easily accessible by taxi or car</p>
            </div>
            <div className="info-card">
              <span className="info-icon">🎟️</span>
              <h3>Affordable Prices</h3>
              <p>Budget-friendly entrance fees make exploring Nairobi accessible to everyone</p>
            </div>
            <div className="info-card">
              <span className="info-icon">👨‍👩‍👧‍👦</span>
              <h3>Family Friendly</h3>
              <p>All attractions offer fun and educational experiences for all ages</p>
            </div>
            <div className="info-card">
              <span className="info-icon">📸</span>
              <h3>Photography Paradise</h3>
              <p>Capture unforgettable moments with wildlife and cultural landscapes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Itinerary Section */}
      <section className="safari-itinerary">
        <div className="container">
          <h2>Suggested Full-Day Itinerary</h2>
          <div className="itinerary-schedule">
            <div className="schedule-item">
              <div className="time-block">
                <span className="time-start">6:00 AM</span>
                <span className="time-dash">—</span>
                <span className="time-end">10:00 AM</span>
              </div>
              <div className="activity-info">
                <h4 className="activity-title">Nairobi National Park</h4>
                <p className="activity-description">Early morning safari (best time for wildlife viewing). Experience lions, rhinos, giraffes, and over 400 bird species.</p>
              </div>
            </div>

            <div className="schedule-item">
              <div className="time-block">
                <span className="time-start">11:00 AM</span>
                <span className="time-dash">—</span>
                <span className="time-end">12:00 PM</span>
              </div>
              <div className="activity-info">
                <h4 className="activity-title">David Sheldrick Elephant Orphanage</h4>
                <p className="activity-description">Watch baby elephants at feeding time inside Nairobi National Park. A heartwarming sanctuary experience.</p>
              </div>
            </div>

            <div className="schedule-item highlight-item">
              <div className="time-block">
                <span className="time-start">12:30 PM</span>
                <span className="time-dash">—</span>
                <span className="time-end">1:30 PM</span>
              </div>
              <div className="activity-info">
                <h4 className="activity-title">Lunch Break</h4>
                <p className="activity-description">Relax and enjoy local Kenyan cuisine at a nearby restaurant.</p>
              </div>
            </div>

            <div className="schedule-item">
              <div className="time-block">
                <span className="time-start">2:00 PM</span>
                <span className="time-dash">—</span>
                <span className="time-end">3:00 PM</span>
              </div>
              <div className="activity-info">
                <h4 className="activity-title">Giraffe Centre</h4>
                <p className="activity-description">Hand-feed endangered Rothschild giraffes from a platform. A unique and interactive experience.</p>
              </div>
            </div>

            <div className="schedule-item">
              <div className="time-block">
                <span className="time-start">3:00 PM</span>
                <span className="time-dash">—</span>
                <span className="time-end">5:00 PM</span>
              </div>
              <div className="activity-info">
                <h4 className="activity-title">Nairobi National Museum</h4>
                <p className="activity-description">Explore Kenya's rich history and culture with exhibits on fossils, wildlife, art, and the Snake Park.</p>
              </div>
            </div>

            <div className="schedule-item">
              <div className="time-block">
                <span className="time-start">Evening</span>
                <span className="time-dash">Optional</span>
                <span className="time-end">7:00 PM</span>
              </div>
              <div className="activity-info">
                <h4 className="activity-title">Bomas of Kenya or Karen Blixen Museum</h4>
                <p className="activity-description">Bomas (2:30-4 PM): Traditional dance shows. Karen Blixen Museum (10 AM-4 PM): Colonial history.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SafariTour
