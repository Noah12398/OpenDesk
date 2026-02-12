import React from 'react';
import { Phone, Moon, Shield, Heart } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './EmergencyHelp.css';

const EmergencyHelp = () => {
  const safeSpaces = [
    { name: "University Night Reading Room", address: "North Campus Gate 4", hours: "24/7", security: "Guard + CCTV" },
    { name: "City Central Library (Study Wing)", address: "District Center", hours: "Until 2 AM", security: "Guard on duty" },
    { name: "Women's Study Hall", address: "Hostel Complex A", hours: "24/7", security: "Biometric Access" },
  ];

  return (
    <div className="emergency-page">
      <div className="container">
        <div className="emergency-header">
          <Heart size={48} className="heart-icon" />
          <h1>Emergency Study Support</h1>
          <p>You are not alone. Safe spaces and support are available.</p>
        </div>

        <section className="helpline-section">
          <h2>24/7 Student Helplines</h2>
          <div className="helpline-grid">
            <Card className="helpline-card">
              <Phone className="helpline-icon" />
              <h3>Academic Stress</h3>
              <p className="helpline-number">1800-123-4567</p>
              <Button size="sm" fullWidth className="btn-call">Call Now</Button>
            </Card>
            <Card className="helpline-card">
              <Shield className="helpline-icon" />
              <h3>Safety & Harassment</h3>
              <p className="helpline-number">1091 (Women)</p>
              <Button size="sm" fullWidth className="btn-call">Call Now</Button>
            </Card>
            <Card className="helpline-card">
              <Moon className="helpline-icon" />
              <h3>Mental Health</h3>
              <p className="helpline-number">14416</p>
              <Button size="sm" fullWidth className="btn-call">Call Now</Button>
            </Card>
          </div>
        </section>

        <section className="safe-spaces-section">
          <h2><Moon size={20} /> Safe Late-Night Study Spaces</h2>
          <div className="spaces-list">
            {safeSpaces.map((space, index) => (
              <Card key={index} className="space-item">
                <div className="space-info">
                  <h3>{space.name}</h3>
                  <p>{space.address}</p>
                </div>
                <div className="space-details">
                  <span className="space-badge">{space.hours}</span>
                  <span className="space-security"><Shield size={14} /> {space.security}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="calm-message">
          <p>"Every challenge is temporary. Take a deep breath. We believe in you."</p>
        </section>
      </div>
    </div>
  );
};

export default EmergencyHelp;
