import React from 'react';
import '../styles/ToolPage.css';

const ToolPage = ({ title, description, component: Component, features, faqs }) => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <Component />
        </div>

        <div className="info-section">
          <div className="info-card">
            <div>
              <h4>Features</h4>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {faqs && faqs.length > 0 && (
            <div className="info-card">
              <div>
                <h4>Frequently Asked Questions</h4>
                {faqs.map((faq, index) => (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <strong>{faq.question}</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
