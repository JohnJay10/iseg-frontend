import './CoOrganizers.css'

const CoOrganizers = () => {
  const organizers = [
    {
      name: 'Prof. Hilary I. Inyang',
      role: 'Founding Organizer & Chair',
      email: 'h.inyang26@gmail.com',
      phone: '+234 814 569 6364',
      organization: 'International Society of Environmental Geotechnology (ISEG)',
      affiliation: 'University of Lagos, Nigeria'
    },
    {
      name: 'Prof. Effiom E. Antia',
      role: 'Forum Chair FA.11 (Coastal and Marine Geotechnology)',
      email: 'e_antia@yahoo.co.uk',
      phone: '+234 803 706 4846',
      organization: 'ISEG',
      affiliation: 'Environmental Consultant, Nigeria'
    },
    {
      name: 'Prof. Chao-Sheng Tang',
      role: 'Co-Organizer',
      email: '',
      phone: '',
      organization: 'Wuhan University / China University of Geosciences',
      affiliation: 'China'
    },
    {
      name: 'Prof. Thokozani Simelane',
      role: 'Co-Organizer',
      email: '',
      phone: '',
      organization: 'University of Eswatini / Southern Africa',
      affiliation: 'Eswatini'
    },
    {
      name: 'Prof. Lise Korsten',
      role: 'Co-Organizer',
      email: '',
      phone: '',
      organization: 'University of Pretoria',
      affiliation: 'South Africa'
    },
    {
      name: 'Prof. John Justus Okon',
      role: 'Forum Chair FA.14 (ICT and AI for Sustainable Development)',
      email: 'jjokon@gmail.com',
      phone: '+18455360826',
      organization: 'ISEG',
      affiliation: 'USA / Africa'
    },
    {
      name: 'Prof. John Osonwa',
      role: 'Forum Chair FA.15 (Climate Change Impacts)',
      email: 'johnosonwa@gmail.com',
      phone: '+234 815 519 0656',
      organization: 'ISEG',
      affiliation: 'Nigeria'
    },
    {
      name: 'Dr. Xiaoshun Qin',
      role: 'Forum Chair FB.2 (Global Peace and Diplomacy)',
      email: 'xiaoshun.qin.SA@gmail.com',
      phone: '+27 72 792 3988',
      organization: 'Southern Africa',
      affiliation: 'South Africa'
    },
    {
      name: 'Mr. Miguel Gonzalez',
      role: 'Forum Chair FB.3 (Education for Sustainable Development)',
      email: 'miguel4.gonzalez@gmail.com',
      phone: '+251 7130 21831',
      organization: 'ISEG',
      affiliation: 'Ethiopia'
    },
    {
      name: 'Pastor Femi Lazarus',
      role: 'Forum Chair FB.4 (Faith Parameters)',
      email: 'femilazarus18@gmail.com',
      phone: '',
      organization: 'ISEG',
      affiliation: 'Nigeria'
    },
    {
      name: 'Dr. Rita S. Senise',
      role: 'Forum Chair FB.5 (Social Systems & Heritage)',
      email: 'rsenise@usp.br',
      phone: '',
      organization: 'University of São Paulo',
      affiliation: 'Brazil'
    },
    {
      name: 'Ms. Tracey Uzoigwe',
      role: 'Forum Chair FB.6 (Global Youth)',
      email: 'livingearth.tracy@gmail.com',
      phone: '+234 703 751 9110',
      organization: 'ISEG',
      affiliation: 'Nigeria'
    },
    {
      name: 'Prof. Cyprian Edward-Ekpo',
      role: 'Forum Chair FB.7 (Legal Systems & Governance)',
      email: 'cyprian.edward@ilawdun.us',
      phone: '+234 803 896 6860',
      organization: 'ISEG',
      affiliation: 'Nigeria'
    },
    {
      name: 'Prof. Olago Daniel',
      role: 'Forum Chair FB.8 (Aquifers & Water Resources)',
      email: 'dolago@uonbi.ac.ke',
      phone: '',
      organization: 'University of Nairobi',
      affiliation: 'Kenya'
    },
    {
      name: 'Prof. Edem Eniang',
      role: 'Forum Chair FB.9 (Nature Reserves & Zoos)',
      email: 'edemeniang@uniuyo.edu.ng',
      phone: '+234 708 888 1313',
      organization: 'University of Uyo',
      affiliation: 'Nigeria'
    },
    {
      name: 'Dr. Chukwumezie Okolo',
      role: 'Forum Chair FB.10 (Drinking Water & Public Health)',
      email: 'drmezieokolo@gmail.com',
      phone: '+234 916 065 1776',
      organization: 'ISEG',
      affiliation: 'Nigeria'
    },
    {
      name: 'Dr. McPhearson',
      role: 'Forum Chair FB.12 (Entrepreneurship)',
      email: 'macfredileogben@gmail.com',
      phone: '+234 802 341 8724',
      organization: 'ISEG',
      affiliation: 'Africa'
    },
    {
      name: 'Dr. Peter Chinedu Nwachukwu',
      role: 'Forum Chair FB.13 (Agriculture & Food Security)',
      email: 'nedupeters@gmail.com',
      phone: '+234 803 797 4101',
      organization: 'ISEG',
      affiliation: 'Nigeria'
    },
    {
      name: 'Prof. John Ifediora',
      role: 'Forum Chair FB.14 (Business & Finance)',
      email: '',
      phone: '+1 608 772 8843',
      organization: 'ISEG',
      affiliation: 'USA'
    }
  ]

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Co-Organizers & Forum Chairs</h1>
          <p>Meet the Organizing Committee for ISEG/GGSD-2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="organizers-intro">
            <h2>Our Leadership Team</h2>
            <p>
              The 14th ISEG/GGSD-2026 Mega Symposium is organized by a distinguished international team of 
              academics, professionals, and leaders committed to advancing environmental geotechnology and 
              sustainable development. This directory provides contact information for key organizers and 
              forum chairs for inquiries, partnerships, and collaboration opportunities.
            </p>
          </div>

          <div className="organizers-grid">
            {organizers.map((org, idx) => (
              <div key={idx} className="organizer-card">
                <div className="organizer-header">
                  <h3>{org.name}</h3>
                  <p className="role">{org.role}</p>
                </div>
                
                <div className="organizer-details">
                  {org.organization && (
                    <p className="detail">
                      <strong>Organization:</strong> {org.organization}
                    </p>
                  )}
                  {org.affiliation && (
                    <p className="detail">
                      <strong>Affiliation:</strong> {org.affiliation}
                    </p>
                  )}
                </div>

                <div className="organizer-contact">
                  {org.email && (
                    <p>
                      <strong>Email:</strong><br />
                      <a href={`mailto:${org.email}`}>{org.email}</a>
                    </p>
                  )}
                  {org.phone && (
                    <p>
                      <strong>Phone:</strong><br />
                      <a href={`tel:${org.phone}`}>{org.phone}</a>
                    </p>
                  )}
                  {!org.email && !org.phone && (
                    <p className="contact-pending">Contact information available upon request</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="organizers-note">
            <h3>How to Connect</h3>
            <p>
              For general symposium inquiries, visit our <strong>Schedule</strong>, <strong>Forums</strong>, 
              or <strong>Registration</strong> pages. For specific questions about forum topics or to propose 
              a presentation:
            </p>
            <ul>
              <li>Contact the relevant forum chair directly using the information provided</li>
              <li>Submit your abstract through our <strong>Call for Abstract</strong> page</li>
              <li>Register for the symposium to access additional contact and networking opportunities</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CoOrganizers
