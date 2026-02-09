import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About ISEG/GGSD 2026</h3>
            <p>14th International Symposium on Environmental Geotechnology and Global Sustainable Development</p>
            <p>August 9-15, 2026 @ University of Nairobi, Kenya</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/schedule">Schedule</a></li>
              <li><a href="/safari-tour">Safari Tour</a></li>
              <li><a href="/submit-abstract">Call for Abstract</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p><strong>Email:</strong> iseg@gisdaad.org</p>
            <p><strong>USA:</strong> +1 734-255-0158</p>
            <p><strong>Nigeria:</strong> +234 806 394 7292</p>
            <p><strong>Kenya:</strong> +254 7049 19592</p>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" className="social-icon" title="Facebook">f</a>
              <a href="#" className="social-icon" title="Twitter">𝕏</a>
              <a href="#" className="social-icon" title="LinkedIn">in</a>
              <a href="#" className="social-icon" title="YouTube">▶</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 ISEG/GGSD Mega Symposium. All rights reserved.</p>
          <p>Organized by Global Institute for Sustainable Development, Advanced Analyses and Design (GISDAAD)</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
