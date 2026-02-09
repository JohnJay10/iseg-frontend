import emailjs from '@emailjs/browser'

// Initialize EmailJS with public key
const EMAILJS_PUBLIC_KEY = 'ri5vNqV8YgjCFUxO8'
const EMAILJS_SERVICE_ID = 'service_1mkcs2c'
const EMAILJS_TEMPLATE_ABSTRACT = 'template_abstract'
const EMAILJS_TEMPLATE_REGISTRATION = 'template_registration'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

// Send abstract submission confirmation email
export const sendAbstractConfirmationEmail = async (email, submissionId, title) => {
  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #E67E22 0%, #D96E10 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">ISEG/GGSD 2026 Mega Symposium</h1>
        </div>
        
        <div style="background: white; padding: 40px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333; margin-top: 0;">Thank You for Your Submission!</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Dear Author,
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            We have successfully received your abstract submission. Your submission has been registered in our system and is now under review.
          </p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #E67E22;">
            <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
              <strong>Submission ID:</strong>
            </p>
            <p style="margin: 0; color: #E67E22; font-size: 18px; font-weight: bold;">
              ${submissionId}
            </p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0098d4;">
            <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
              <strong>Paper Title:</strong>
            </p>
            <p style="margin: 0; color: #333; font-size: 16px;">
              ${title}
            </p>
          </div>
          
          <h3 style="color: #333; margin-top: 30px;">Important Information:</h3>
          <ul style="color: #666; font-size: 15px; line-height: 1.8;">
            <li>Your submission ID is required for any inquiries about your abstract</li>
            <li>You will receive an acceptance/rejection notification by <strong>May 30, 2026</strong></li>
            <li>Registration closes on <strong>June 30, 2026</strong></li>
            <li>The Symposium will be held from <strong>August 9-15, 2026</strong> at the University of Nairobi, Kenya</li>
          </ul>
          
          <p style="color: #666; font-size: 15px; line-height: 1.6; margin-top: 30px;">
            If you have any questions or need further assistance, please don't hesitate to contact us at <strong>iseg@gisdaad.org</strong>.
          </p>
          
          <p style="color: #666; font-size: 15px; line-height: 1.6;">
            Best regards,<br/>
            <strong>ISEG/GGSD 2026 Symposium Team</strong>
          </p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
          <p style="margin: 0;">14th International Symposium on Environmental Geotechnology and Global Sustainable Development</p>
          <p style="margin: 5px 0 0 0;">University of Nairobi, Kenya | August 9-15, 2026</p>
        </div>
      </div>
    `

    const templateParams = {
      to_email: email,
      subject: 'Abstract Submission Confirmation - ISEG/GGSD 2026 Mega Symposium',
      html_message: emailContent,
      submission_id: submissionId,
      paper_title: title,
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ABSTRACT,
      templateParams
    )

    console.log('✅ Abstract confirmation email sent successfully')
    return true
  } catch (error) {
    console.error('❌ Error sending abstract confirmation email:', error)
    return false
  }
}

// Send registration confirmation email
export const sendRegistrationConfirmationEmail = async (registrationData) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      registrationType,
      totalAmount,
      shortCourse,
      safariTour,
      ticketId,
    } = registrationData

    // Format registration package
    const registrationPackage = {
      'part-a': 'Part A Only (Aug 9-11: Environmental Geotechnology)',
      'part-b': 'Part B Only (Aug 13-15: Sustainable Development)',
      'both': 'Both Parts (Complete Symposium Experience)',
      'all': 'All-Inclusive (With Safari & Short Courses)',
    }[registrationType] || registrationType

    let addedServices = []
    if (shortCourse) addedServices.push('Short Course')
    if (safariTour) addedServices.push('Kenya Safari Tour')

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">✓ Registration Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">ISEG/GGSD 2026 Mega Symposium</p>
        </div>
        
        <div style="background: white; padding: 40px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333; margin-top: 0;">Welcome, ${firstName}!</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Thank you for registering for the ISEG/GGSD 2026 Mega Symposium. Your registration has been successfully processed and confirmed.
          </p>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2ECC71;">
            <h3 style="margin-top: 0; color: #2ECC71;">Your Event Ticket</h3>
            <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
              Ticket ID: <strong>${ticketId}</strong>
            </p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #333;">Registration Details</h3>
            
            <table style="width: 100%; color: #666; font-size: 15px;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; padding-right: 15px; font-weight: bold;">Name:</td>
                <td style="padding: 10px 0;">${firstName} ${lastName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; padding-right: 15px; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; padding-right: 15px; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; padding-right: 15px; font-weight: bold;">Package:</td>
                <td style="padding: 10px 0;">${registrationPackage}</td>
              </tr>
              ${addedServices.length > 0 ? `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; padding-right: 15px; font-weight: bold;">Additional Services:</td>
                <td style="padding: 10px 0;">${addedServices.join(', ')}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; padding-right: 15px; font-weight: bold;">Total Amount:</td>
                <td style="padding: 10px 0; color: #2ECC71; font-weight: bold; font-size: 16px;">$${totalAmount.toFixed(2)}</td>
              </tr>
            </table>
          </div>
          
          <h3 style="color: #333;">Important Information:</h3>
          <ul style="color: #666; font-size: 15px; line-height: 1.8;">
            <li>📅 <strong>Dates:</strong> August 9-15, 2026</li>
            <li>📍 <strong>Location:</strong> University of Nairobi, Kenya</li>
            <li>🎫 <strong>Ticket:</strong> ${ticketId}</li>
            <li>✉️ <strong>Questions?</strong> Contact us at iseg@gisdaad.org</li>
          </ul>
          
          <p style="color: #666; font-size: 15px; line-height: 1.6; margin-top: 30px;">
            We look forward to seeing you at the symposium!
          </p>
          
          <p style="color: #666; font-size: 15px; line-height: 1.6;">
            Best regards,<br/>
            <strong>ISEG/GGSD 2026 Symposium Team</strong>
          </p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
          <p style="margin: 0;">14th International Symposium on Environmental Geotechnology and Global Sustainable Development</p>
          <p style="margin: 5px 0 0 0;">University of Nairobi, Kenya | August 9-15, 2026</p>
        </div>
      </div>
    `

    const templateParams = {
      to_email: email,
      subject: 'Registration Confirmed - Your Event Ticket | ISEG/GGSD 2026',
      html_message: emailContent,
      first_name: firstName,
      last_name: lastName,
      ticket_id: ticketId,
      registration_package: registrationPackage,
      total_amount: totalAmount.toFixed(2),
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_REGISTRATION,
      templateParams
    )

    console.log('✅ Registration confirmation email sent successfully')
    return true
  } catch (error) {
    console.error('❌ Error sending registration confirmation email:', error)
    return false
  }
}

export default {
  sendAbstractConfirmationEmail,
  sendRegistrationConfirmationEmail,
}
