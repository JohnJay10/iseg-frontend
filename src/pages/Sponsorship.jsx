import './Sponsorship.css'

const Sponsorship = () => {
  const sponsorshipLevels = [
    {
      level: 'PLATINUM',
      contribution: '$30,000 and above',
      color: '#d4af37',
      benefits: [
        'Waiver of registration fees for 10 registrants',
        'Brand visibility across 30,000 organizations in 70 countries through advertisement',
        'Acknowledgement at opening ceremony',
        'Inclusion of logo in conference program and materials',
        'Acknowledgement of sponsorship and guest remarks by sponsor at opening ceremony with option for a side session',
        'Exhibition booth',
        'Scholarship for 5 students and professionals who cannot afford registration fees'
      ]
    },
    {
      level: 'GOLD',
      contribution: '$20,000 to $29,999',
      color: '#ffd700',
      benefits: [
        'Waiver of registration fees for 5 registrants',
        'Brand visibility across 30,000 organizations in 70 countries',
        'Acknowledgement at opening ceremony',
        'Inclusion of logo in conference program and materials',
        'Acknowledgement of sponsorship at opening ceremony',
        'Scholarship for 3 students and professionals who cannot afford registration fees'
      ]
    },
    {
      level: 'SILVER',
      contribution: '$10,000 to $19,999',
      color: '#c0c0c0',
      benefits: [
        'Brand visibility across 30,000 organizations in 70 countries',
        'Inclusion of logo in conference program',
        'Acknowledgement at opening ceremony',
        'Scholarship for 2 students and professionals who cannot afford registration fees'
      ]
    },
    {
      level: 'BRONZE',
      contribution: '$5,000 to $9,999',
      color: '#cd7f32',
      benefits: [
        'Brand visibility across 30,000 organizations in 70 countries',
        'Inclusion of logo in conference program',
        'Acknowledgement at opening ceremony',
        'Scholarship for 2 students and professionals who cannot afford registration fees'
      ]
    },
    {
      level: 'GENERAL SUPPORT',
      contribution: '$4,999 and below',
      color: '#888888',
      benefits: [
        'Free registration for three participants'
      ]
    }
  ]

  const partnershipOpportunities = [
    {
      title: 'Exhibition Booth',
      description: 'Showcase your products and services to a global audience of 30,000+ professionals across 70 countries',
      availability: 'Available with Platinum and Gold sponsorships'
    },
    {
      title: 'Keynote Speaking',
      description: 'Deliver a keynote presentation at one of the symposium sessions to highlight your organization\'s expertise',
      availability: 'Negotiable based on sponsorship level'
    },
    {
      title: 'Dedicated Side Session',
      description: 'Host a special session focused on your organization\'s work and initiatives',
      availability: 'Available with Platinum sponsorship'
    },
    {
      title: 'Scholarship Support',
      description: 'Sponsor scholarships for students and early-career professionals from the Global South',
      availability: 'All sponsorship levels'
    },
    {
      title: 'Workshop Co-sponsorship',
      description: 'Co-sponsor one of the professional training workshops',
      availability: 'Contact organizing committee for details'
    }
  ]

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Sponsorship Opportunities</h1>
          <p>Partner with the 14th ISEG/GGSD-2026 Mega Symposium</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sponsorship-intro">
            <h2>Join Us as a Sponsor</h2>
            <p>
              The 14th ISEG/GGSD-2026 Mega Symposium brings together over 30,000 organizations 
              and professionals from 70 countries dedicated to environmental geotechnology and sustainable development. 
              Sponsoring this event provides your organization with unparalleled visibility and networking opportunities 
              within this global community.
            </p>
          </div>

          <div className="sponsorship-levels">
            <h3>Sponsorship Levels & Benefits</h3>
            <div className="levels-grid">
              {sponsorshipLevels.map((level, idx) => (
                <div 
                  key={idx} 
                  className="sponsorship-card"
                  style={{ borderTopColor: level.color }}
                >
                  <div className="level-header" style={{ backgroundColor: level.color }}>
                    <h4 className="level-name">{level.level}</h4>
                    <p className="level-contribution">{level.contribution}</p>
                  </div>

                  <div className="level-benefits">
                    <ul>
                      {level.benefits.map((benefit, bIdx) => (
                        <li key={bIdx}>
                          <span className="benefit-icon">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="level-action">
                    <a 
                      href="https://www.iseg-ggsd.com.ng" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      Become a {level.level} Sponsor
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="partnership-opportunities">
            <h3>Partnership Opportunities</h3>
            <p>Beyond traditional sponsorship, we offer customized partnership options:</p>
            <div className="opportunities-grid">
              {partnershipOpportunities.map((opp, idx) => (
                <div key={idx} className="opportunity-card">
                  <h4>{opp.title}</h4>
                  <p className="description">{opp.description}</p>
                  <p className="availability">
                    <strong>Availability:</strong> {opp.availability}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="sponsorship-benefits">
            <h2>Why Sponsor ISEG/GGSD-2026?</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <h4>🌍 Global Reach</h4>
                <p>Connect with decision-makers and experts from 70 countries across all continents</p>
              </div>
              <div className="benefit-item">
                <h4>👥 Targeted Audience</h4>
                <p>Access 30,000+ professionals in environmental geotechnology, sustainable development, and related fields</p>
              </div>
              <div className="benefit-item">
                <h4>📢 Brand Visibility</h4>
                <p>Gain significant exposure through conference materials, website, and direct promotion</p>
              </div>
              <div className="benefit-item">
                <h4>🤝 Networking</h4>
                <p>Build relationships with industry leaders, government officials, and academic experts</p>
              </div>
              <div className="benefit-item">
                <h4>🎯 Thought Leadership</h4>
                <p>Establish your organization as a leader in your field through symposium presentations and workshops</p>
              </div>
              <div className="benefit-item">
                <h4>📊 Research Exposure</h4>
                <p>Get your research and innovations in front of the most relevant audience in your sector</p>
              </div>
            </div>
          </div>

          <div className="sponsorship-contact">
            <h3>Ready to Sponsor?</h3>
            <p>
              For sponsorship inquiries and customized partnership proposals, please contact the organizing committee:
            </p>
            <div className="contact-options">
              <div className="contact-card">
                <h4>🌐 Online Registration</h4>
                <p>
                  Visit: <a href="https://www.iseg-ggsd.com.ng" target="_blank" rel="noopener noreferrer">
                    www.iseg-ggsd.com.ng
                  </a>
                </p>
                <p>Select your sponsorship level and complete payment</p>
              </div>
              <div className="contact-card">
                <h4>📧 Email Inquiry</h4>
                <p>Send a sponsorship inquiry email with your organization details and preferred sponsorship level</p>
                <p>You will be contacted by the organizing committee</p>
              </div>
              <div className="contact-card">
                <h4>💬 Direct Contact</h4>
                <p>For large sponsorship packages or complex partnerships, request a direct meeting with the organizing committee</p>
              </div>
            </div>
          </div>

          <div className="tax-info">
            <p>
              <strong>Note:</strong> The organizing institutions and ISEG are recognized non-profit organizations. 
              Sponsorship contributions may be tax-deductible depending on your jurisdiction. Please consult your tax advisor.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Sponsorship
