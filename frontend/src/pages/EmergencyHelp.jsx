import React, { useState } from 'react';
import { Phone, Moon, Shield, Heart, MapPin, Share2, AlertTriangle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './EmergencyHelp.css';

const EmergencyHelp = () => {
  const [locationLoading, setLocationLoading] = useState(false);

  const safeSpaces = [
    { name: "University Night Reading Room", address: "North Campus Gate 4", hours: "24/7", security: "Guard + CCTV" },
    { name: "City Central Library (Study Wing)", address: "District Center", hours: "Until 2 AM", security: "Guard on duty" },
    { name: "Women's Study Hall", address: "Hostel Complex A", hours: "24/7", security: "Biometric Access" },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `I need help! My current location is: ${mapLink}`;

        if (navigator.share) {
          try {
            await navigator.share({
              title: "Emergency Help Needed",
              text: message,
              url: mapLink
            });
          } catch (error) {
            console.error("Error sharing:", error);
          }
        } else {
          // Fallback to clipboard
          navigator.clipboard.writeText(message);
          alert("Location copied to clipboard! You can paste it in WhatsApp or SMS.");
        }
        setLocationLoading(false);
      },
      (error) => {
        alert("Unable to retrieve location. Please check permissions.");
        setLocationLoading(false);
      }
    );
  };

  return (
    <div className="emergency-page">
      <div className="container">
        <div className="emergency-header">
          <Heart size={48} className="heart-icon" />
          <h1>Emergency Study Support</h1>
          <p>You are not alone. Safe spaces and help are just a tap away.</p>
        </div>

        {/* Quick Action: Share Location */}
        <section className="quick-action-section">
          <Card className="action-card warning-card">
            <div className="action-content">
              <AlertTriangle className="action-icon" size={32} />
              <div>
                <h3>In Danger?</h3>
                <p>Share your live location with trusted contacts immediately.</p>
              </div>
            </div>
            <Button 
              variant="primary" 
              className="btn-emergency"
              onClick={handleShareLocation}
              disabled={locationLoading}
            >
              <Share2 size={18} style={{ marginRight: '8px' }} />
              {locationLoading ? "Locating..." : "Share My Location"}
            </Button>
          </Card>
        </section>

        <section className="helpline-section">
          <h2>24/7 Student Helplines</h2>
          <div className="helpline-grid">
            <Card className="helpline-card">
              <Phone className="helpline-icon" />
              <h3>Academic Stress</h3>
              <p className="helpline-number">1800-123-4567</p>
              <Button size="sm" fullWidth className="btn-call" onClick={() => handleCall('18001234567')}>Call Now</Button>
            </Card>
            <Card className="helpline-card">
              <Shield className="helpline-icon" />
              <h3>Safety & Harassment</h3>
              <p className="helpline-number">1091 (Women)</p>
              <Button size="sm" fullWidth className="btn-call" onClick={() => handleCall('1091')}>Call Now</Button>
            </Card>
            <Card className="helpline-card">
              <Moon className="helpline-icon" />
              <h3>Mental Health</h3>
              <p className="helpline-number">14416</p>
              <Button size="sm" fullWidth className="btn-call" onClick={() => handleCall('14416')}>Call Now</Button>
            </Card>
          </div>
        </section>

        <section className="safe-spaces-section">
          <h2><Moon size={20} /> Nearby Safe Spaces</h2>
          <p className="section-subtitle">Verified locations with security and late-night access.</p>
          <div className="spaces-list">
            {safeSpaces.map((space, index) => (
              <Card key={index} className="space-item">
                <div className="space-info">
                  <h3>{space.name}</h3>
                  <p className="space-address"><MapPin size={14} /> {space.address}</p>
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
