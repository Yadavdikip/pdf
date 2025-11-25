import React from 'react';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p>Last Updated: January 1, 2024</p>
        
        <div className="policy-content">
          <h2>Information We Collect</h2>
          <p>We collect information to provide better services to our users.</p>
          
          <h2>How We Use Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services.</p>
          
          <h2>Data Security</h2>
          <p>We work hard to protect our users from unauthorized access to their information.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;