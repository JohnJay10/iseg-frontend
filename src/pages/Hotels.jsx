import './Hotels.css'

const Hotels = () => {
  const hotels = [
    {
      id: 1,
      name: 'Maanzoni 680 Hotel',
      location: 'Kenyatta Avenue, Muindi Mbingu Street, Nairobi, Kenya',
      description: 'Main Mega-Symposium Venue with 127 Rooms',
      contactPerson: 'Jocelyn Kimuyu',
      contactTitle: 'Reservations Manager',
      email: 'reservations@maanzoni680hotel.co.ke',
      phone: '+254 733 700083',
      website: '',
      rooms: [
        { type: 'Standard Rooms', price: '$70', description: 'One person with breakfast' },
        { type: 'Executive Rooms', price: '$110', description: 'Two persons with breakfast' },
        { type: 'Superior Rooms', price: '$80', description: 'One person with breakfast' }
      ],
      bookinInfo: 'Book before August 5, 2026 for special rates',
      featured: true
    },
    {
      id: 2,
      name: 'Chester Hotel',
      location: 'Koinange Street, P.O Box 57104-00200, Nairobi, Kenya',
      description: 'Boutique Hotel with 79 Rooms',
      contactPerson: 'David Avugwe',
      contactTitle: 'Reservations Manager',
      email: 'davugwe@monarch.co.ke',
      phone: '+254 722 596665',
      website: '',
      rooms: [
        { type: 'Studio Rooms', price: '$50-65', description: 'Single or double occupancy with breakfast' },
        { type: 'Standard Rooms', price: '$60-80', description: 'Single or double occupancy with breakfast' },
        { type: 'Executive Rooms', price: '$70-80', description: 'Single or double occupancy with breakfast' }
      ],
      bookingInfo: 'Book before August 5, 2026 for special rates'
    },
    {
      id: 3,
      name: 'Clarion Hotel',
      location: 'Moi Avenue, Opposite Jevanje Garden, Nairobi, Kenya',
      description: 'Modern Hotel with 62 Rooms',
      contactPerson: 'Nduta Mwangi',
      contactTitle: 'Manager, Sales & Marketing',
      email: 'ndutamwangi@theclarionhotel.co.ke',
      phone: '+254797343895',
      website: '',
      rooms: [
        { type: 'Studio Rooms', price: '$50-65', description: 'Single or double occupancy with breakfast' },
        { type: 'Balcony Rooms', price: '$60-70', description: 'Single or double occupancy with breakfast' },
        { type: 'Panorama Rooms', price: '$70-80', description: 'Single or double occupancy with breakfast' }
      ],
      bookingInfo: 'Book before August 5, 2026 for special rates'
    },
    {
      id: 4,
      name: 'Decasa Hotel',
      location: 'Nairobi town CBD, along Upper River Road, opposite KCB Bank, Nairobi Kenya',
      description: 'Budget-Friendly Option with 62 Rooms',
      contactPerson: 'Lucy Wanjiku Kiruri',
      contactTitle: 'Operations Director',
      email: 'decasahotel@gmail.com',
      phone: '+254 736 442653',
      website: '',
      rooms: [
        { type: 'Single Room', price: '$18', description: 'One person with breakfast' },
        { type: 'Double Room', price: '$25', description: 'Two persons (double bed) with breakfast' },
        { type: 'Twin Room', price: '$32', description: 'Two persons (twin beds) with breakfast' }
      ],
      bookingInfo: 'Book before August 5, 2026 for special rates'
    }
  ]

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Accommodations & Hotels</h1>
          <p>Book your stay for ISEG/GGSD-2026 Symposium</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hotels-intro">
            <h2>Hotel Booking Information</h2>
            <p>  
              Intending participants are urged to select their hotels of interest and book their rooms at special 
              negotiated rates before <strong>August 5, 2026</strong>. All hotels are conveniently located within walking 
              distance or short drive of the main conference venue (Maanzoni 680 Hotel).
            </p>
          </div>

          <div className="hotels-grid">
            {hotels.map((hotel) => (
              <div key={hotel.id} className={`hotel-card ${hotel.featured ? 'featured' : ''}`}>
                {hotel.featured && <span className="featured-badge">Main Venue</span>}
                
                <div className="hotel-header">
                  <h3>{hotel.name}</h3>
                  <p className="hotel-desc">{hotel.description}</p>
                </div>

                <div className="hotel-location">
                  <strong>📍 Location:</strong>
                  <p>{hotel.location}</p>
                </div>

                <div className="hotel-contact">
                  <strong>Contact Information:</strong>
                  <div className="contact-details">
                    <p><strong>{hotel.contactTitle}:</strong> {hotel.contactPerson}</p>
                    <p><strong>Email:</strong> {hotel.email}</p>
                    <p><strong>Phone:</strong> {hotel.phone}</p>
                  </div>
                </div>

                <div className="hotel-rooms">
                  <strong>Room Types & Rates:</strong>
                  <div className="rooms-list">
                    {hotel.rooms.map((room, idx) => (
                      <div key={idx} className="room-option">
                        <span className="room-type">{room.type}</span>
                        <span className="room-price">{room.price}</span>
                        <p className="room-desc">{room.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="booking-info">
                  <p>{hotel.bookingInfo}</p>
                </div>

                <div className="hotel-actions">
                  <a href={`mailto:${hotel.email}`} className="btn btn-secondary btn-sm">
                    Send Inquiry
                  </a>
                  <a href={`tel:${hotel.phone}`} className="btn btn-secondary btn-sm">
                    Call Hotel
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="hotels-tips">
            <h3>Booking Tips</h3>
            <ul>
              <li>✓ All rates include breakfast</li>
              <li>✓ Book early to secure special symposium rates</li>
              <li>✓ All hotels are within Nairobi CBD or near the main venue</li>
              <li>✓ Contact hotels directly for group bookings or special requests</li>
              <li>✓ Deadline for booking: August 5, 2026</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Hotels
