import React, { useState, useEffect } from 'react';
import '../styles/registrationguide.css';

const steps = [
  { title: 'Enter GST number', description: 'Details about entering GST number.' },
  { title: 'Verify GST number', description: 'Details about verifying GST number.' },
  { title: 'Enter store name', description: 'Details about entering store name.' },
  { title: 'Enter pickup address', description: 'Details about entering pickup address.' },
  { title: 'Choose shipping method', description: 'Details about choosing a shipping method.' },
  { title: 'Add bank account', description: 'Details about adding a bank account.' },
  { title: 'List your products', description: 'Details about listing your products.' },
  { title: 'Launch your store', description: 'Details about launching your store.' },
];

const RegistrationGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionHeight = window.innerHeight / steps.length;
      const scrolledStep = Math.floor(window.scrollY / sectionHeight);
      setCurrentStep(Math.min(scrolledStep, steps.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="registration-guide">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h3>Start seller registration</h3>
        <ul className="step-list">
          {steps.map((step, index) => (
            <li key={index} className={`step-item ${currentStep === index ? 'active' : ''}`}>
              {step.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="content">
        {steps.map((step, index) => (
          <div key={index} className="content-section" id={`step-${index}`}>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationGuide;
