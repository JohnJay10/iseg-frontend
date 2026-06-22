import './RefundPolicy.css'

const RefundPolicy = () => {
  return (
    <div className="policy-container">
      <div className="policy-content">
        <h1>Refund Policy</h1>
        <p className="last-updated">Last Updated: June 2026</p>

        <section className="policy-section">
          <h2>1. Overview</h2>
          <p>
            INTEGRAL QUINTESSENCE ENTERPRISE is committed to customer satisfaction. This Refund Policy outlines the terms and conditions under which refunds will be issued for registration and event fees.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Registration Refunds</h2>
          <h3>Full Refund</h3>
          <p>
            A full refund (minus any administrative fees) will be issued if cancellation is requested more than 30 days before the event date (August 9, 2026).
          </p>
          <h3>Partial Refund</h3>
          <p>
            A 50% refund will be issued for cancellations made between 15-30 days before the event date.
          </p>
          <h3>No Refund</h3>
          <p>
            No refund will be issued for cancellations made less than 15 days before the event date.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Abstract Submission Fees</h2>
          <p>
            Abstract submission fees are non-refundable. However, if your abstract is rejected or you withdraw before final acceptance, you may request a refund of the submission fee.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. How to Request a Refund</h2>
          <p>
            To request a refund, please contact our team with your registration details and reason for cancellation:
          </p>
          <ul>
            <li>Email: iseg@gisdaad.org</li>
            <li>Phone: +1 734-255-0158</li>
          </ul>
          <p>
            Refund requests must be submitted in writing. Processing time for refunds is typically 7-14 business days after approval.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Payment Method</h2>
          <p>
            Refunds will be issued to the original payment method used for the transaction. Depending on your financial institution, it may take an additional 3-5 business days for the funds to appear in your account.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Special Circumstances</h2>
          <p>
            In cases of event cancellation or major changes due to unforeseen circumstances, full refunds will be issued regardless of the cancellation date.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Refund Policy, please contact us:
          </p>
          <p>
            <strong>INTEGRAL QUINTESSENCE ENTERPRISE</strong><br />
            Email: iseg@gisdaad.org<br />
            Phone: +1 734-255-0158
          </p>
        </section>
      </div>
    </div>
  )
}

export default RefundPolicy
