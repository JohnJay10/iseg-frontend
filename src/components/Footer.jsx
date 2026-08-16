import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About IMEG-GSD 2027</h3>
            <p>14th International Symposium on Environmental Geotechnology and Global Sustainable Development</p>
            <p>February 14-23, 2027 @ Maanzoni 680 Hotel, Nairobi, Kenya</p>
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
            <h4>Policies</h4>
            <ul>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/refund-policy">Refund Policy</a></li>
              <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p><strong>Email:</strong> imeg@gisdaad.org</p>
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
          <p>&copy; 2027 INTEGRAL QUINTESSENCE ENTERPRISE. All rights reserved.</p>
          <p>Organized by Global Institute for Sustainable Development, Advanced Analyses and Design (GISDAAD)</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer