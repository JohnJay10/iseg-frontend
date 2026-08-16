import { useState } from 'react'
import './DirectTransferPayment.css'

const DirectTransferPayment = ({ totalAmount, registrationData, onBack }) => {
  const [copiedField, setCopiedField] = useState(null)

  const bankAccounts = [
    {
      id: 'kenya-kes',
      name: 'Rinseton Advisory',
      location: 'Koinange Street, Nairobi, Kenya',
      accountNumber: '10011214000617',
      bankName: 'Consolidated Bank',
      currency: 'Kenyan Shilling (KES)',
      swiftCode: 'CONKKENAXXX',
      bankCode: '023',
      branchCode: '004',
    },
    {
      id: 'kenya-usd',
      name: 'Rinseton Advisory',
      location: 'Koinange Street, Nairobi, Kenya',
      accountNumber: '10012200000404',
      bankName: 'Consolidated Bank',
      currency: 'United States Dollars (USD)',
      swiftCode: 'CONKKENAXXX',
      bankCode: '023',
      branchCode: '004',
    },
    {
      id: 'nigeria-ngn',
      name: 'IMEG-GSD-IQ ENT FUNDRAISING ACCOUNT',
      location: 'Nigeria',
      accountNumber: '5601719521',
      bankName: 'FIDELITY BANK PLC',
      currency: 'Nigerian Naira (₦)',
      swiftCode: 'FIDTNGLA',
      tin: '222010124-0001',
    },
    {
      id: 'nigeria-usd',
      name: 'IMEG-GSD-IQ ENT FUNDRAISING ACCOUNT',
      location: 'Nigeria',
      accountNumber: '5240093293',
      bankName: 'FIDELITY BANK PLC',
      currency: 'United States Dollars (USD)',
      swiftCode: 'FIDTNGLA',
      tin: '222010124-0001',
    },
    {
      id: 'nigeria-gbp',
      name: 'IMEG-GSD-IQ ENT FUNDRAISING ACCOUNT',
      location: 'Nigeria',
      accountNumber: '5240093303',
      bankName: 'FIDELITY BANK PLC',
      currency: 'Great British Pounds (GBP)',
      swiftCode: 'FIDTNGLA',
      tin: '222010124-0001',
    },
  ]

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="direct-transfer-container">
      <div className="transfer-header">
        <h2>Bank Transfer Payment</h2>
        <p className="transfer-subtitle">
          Make a direct wire transfer to one of our accounts below. Please include your registration email in the transfer reference.
        </p>
        <div className="amount-display">
          <span className="amount-label">Amount Due:</span>
          <span className="amount-value">${totalAmount.toFixed(2)} USD</span>
        </div>
      </div>

      <div className="bank-accounts-grid">
        {bankAccounts.map((account) => (
          <div key={account.id} className="bank-account-card">
            <div className="card-header">
              <h3>{account.name}</h3>
              <span className="currency-badge">{account.currency}</span>
            </div>

            <div className="account-details">
              {/* Bank Name */}
              <div className="detail-row">
                <label>Bank Name</label>
                <div className="detail-value-wrapper">
                  <div className="detail-value">{account.bankName}</div>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(account.bankName, `bank-${account.id}`)}
                    title="Copy bank name"
                  >
                    {copiedField === `bank-${account.id}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className="detail-row">
                <label>Account Number</label>
                <div className="detail-value-wrapper">
                  <div className="detail-value">{account.accountNumber}</div>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(account.accountNumber, `account-${account.id}`)}
                    title="Copy account number"
                  >
                    {copiedField === `account-${account.id}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Account Name */}
              <div className="detail-row">
                <label>Account Name</label>
                <div className="detail-value-wrapper">
                  <div className="detail-value">{account.name}</div>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(account.name, `name-${account.id}`)}
                    title="Copy account name"
                  >
                    {copiedField === `name-${account.id}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="detail-row">
                <label>Location</label>
                <div className="detail-value-wrapper">
                  <div className="detail-value">{account.location}</div>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(account.location, `location-${account.id}`)}
                    title="Copy location"
                  >
                    {copiedField === `location-${account.id}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {account.bankCode && (
                <div className="detail-row">
                  <label>Bank Code</label>
                  <div className="detail-value-wrapper">
                    <div className="detail-value">{account.bankCode}</div>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(account.bankCode, `bankcode-${account.id}`)}
                      title="Copy bank code"
                    >
                      {copiedField === `bankcode-${account.id}` ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {account.branchCode && (
                <div className="detail-row">
                  <label>Branch Code</label>
                  <div className="detail-value-wrapper">
                    <div className="detail-value">{account.branchCode}</div>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(account.branchCode, `branch-${account.id}`)}
                      title="Copy branch code"
                    >
                      {copiedField === `branch-${account.id}` ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              <div className="detail-row">
                <label>SWIFT Code</label>
                <div className="detail-value-wrapper">
                  <div className="detail-value">{account.swiftCode}</div>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(account.swiftCode, `swift-${account.id}`)}
                    title="Copy SWIFT code"
                  >
                    {copiedField === `swift-${account.id}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {account.tin && (
                <div className="detail-row">
                  <label>TIN</label>
                  <div className="detail-value-wrapper">
                    <div className="detail-value">{account.tin}</div>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(account.tin, `tin-${account.id}`)}
                      title="Copy TIN"
                    >
                      {copiedField === `tin-${account.id}` ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Important Instructions */}
      <div className="important-notice">
        <div className="notice-header">
          <span className="notice-icon">⚠️</span>
          <h3>Important Instructions</h3>
        </div>
        <ul className="notice-list">
          <li>
            <strong>Include Your Email:</strong> Please add your email address ({registrationData.email}) in the payment reference or description field
          </li>
          <li>
            <strong>Choose Correct Account:</strong> Use the Fidelity Bank account matching your currency: NGN, USD, or GBP, or use the Consolidated Bank Kenya account for KES or USD payments
          </li>
          <li>
            <strong>Bank Code / Branch Code:</strong> For Kenya transfers, use <strong>Bank Code 023</strong> and <strong>Branch Code 004</strong> (Koinange Street)
          </li>
          <li>
            <strong>SWIFT Code:</strong> Use <strong>CONKKENAXXX</strong> for Kenya and <strong>FIDTNGLA</strong> for Nigeria
          </li>
          <li>
            <strong>Keep Proof:</strong> Save the transfer receipt or confirmation number for your records
          </li>
          <li>
            <strong>Processing Time:</strong> Bank transfers may take 3-5 business days to process
          </li>
          <li>
            <strong>Confirm Receipt:</strong> We will send you a confirmation email once the transfer is received
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-item">
          <div className="faq-question">
            <strong>Which account should I use?</strong>
          </div>
          <div className="faq-answer">
            Use the Kenya account for KES or USD payments and the Nigeria account for NGN, USD, or GBP payments.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">
            <strong>How do I know when my payment is received?</strong>
          </div>
          <div className="faq-answer">
            You will receive a confirmation email at {registrationData.email} within 3-5 business days once the transfer is received and verified.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">
            <strong>What if there's an issue with my transfer?</strong>
          </div>
          <div className="faq-answer">
            Contact our support team with your transfer receipt and we'll help resolve any issues.
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="button-container">
        <button className="back-btn" onClick={onBack}>
          ← Back to Payment Methods
        </button>
        <p className="help-text">
          If you need help, please contact us at support@imeg-conference.org
        </p>
      </div>
    </div>
  )
}

export default DirectTransferPayment
