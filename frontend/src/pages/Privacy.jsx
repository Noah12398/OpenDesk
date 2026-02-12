import React from 'react';
import Card from '../components/common/Card';

const Privacy = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <Card>
        <h1>Privacy Policy</h1>
        <p className="text-muted" style={{ marginBottom: '20px' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section style={{ marginBottom: '24px' }}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to OpenDesk. We respect your privacy and are committed to protecting potential personal data. 
            This policy explains how we handle information when you use our platform to find or add learning resources.
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2>2. Information We Collect</h2>
          <p>
            <strong>For Learners:</strong> You can browse the map and use resources without creating an account or providing personal details.
          </p>
          <p>
            <strong>For Contributors:</strong> When you add a resource, we collect:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>Your email address (for account management)</li>
            <li>Information about the resource (location, contact details)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2>3. Location Data</h2>
          <p>
            We use your location only when you explicitly click "Use My Location" or "Share Location" buttons to help you find nearby resources 
            or share your status in an emergency. This data is not stored on our servers unless you submit a resource with those coordinates.
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2>4. Data Sharing</h2>
          <p>
            OpenDesk is a public good platform. The resource information you submit is made publicly available to help students. 
            We do not sell your personal data to third parties.
          </p>
        </section>
        
        <section>
          <h2>5. Contact Us</h2>
          <p>
            If you have questions about this policy, please contact us at privacy@opendesk.org.
          </p>
        </section>
      </Card>
    </div>
  );
};

export default Privacy;
