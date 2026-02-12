import React from 'react';
import Card from '../components/common/Card';
import { Target, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--primary-color)' }}>About OpenDesk</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Bridging the digital divide one study space at a time.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '24px', marginBottom: '40px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Target size={32} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
            <div>
              <h2>Our Mission</h2>
              <p>
                To ensure every student, regardless of their background or housing situation, has access to a safe, 
                quiet, and connected place to study. We believe education is a right, and the environment to learn shouldn't be a privilege.
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Users size={32} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
            <div>
              <h2>Who We Are</h2>
              <p>
                OpenDesk is a community-driven platform built by students, developers, and social impact advocates. 
                We map public libraries, community centers, and NGOs that open their doors to learners.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Heart size={32} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
            <div>
              <h2>Why It Matters</h2>
              <p>
                Millions of students struggle with crowded homes, lack of electricity, or expensive data plans. 
                By making visible the hidden infrastructure of public spaces, we empower students to take control of their education.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <h3>Join the Movement</h3>
        <p style={{ margin: '16px 0 24px' }}>Know a free place to study? Put it on the map.</p>
        <a href="/add-resource" className="btn btn-primary">Add a Resource</a>
      </div>
    </div>
  );
};

export default About;
