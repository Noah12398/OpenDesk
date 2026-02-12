import React, { useState } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container" style={{ padding: '60px 20px', maxWidth: '600px', textAlign: 'center' }}>
        <Card>
          <CheckCircle size={64} color="var(--color-success)" style={{ margin: '0 auto 20px' }} />
          <h2>Message Sent!</h2>
          <p>Thanks for reaching out. We'll get back to you shortly.</p>
          <Button 
            className="btn-outline" 
            style={{ marginTop: '20px' }}
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
          >
            Send Another Message
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1000px' }}>
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Contact Us</h1>
      
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        <div className="contact-info">
          <Card>
            <h2>Get in Touch</h2>
            <p style={{ marginBottom: '24px', color: '#666' }}>
              Have questions about OpenDesk? Want to partner with us? We'd love to hear from you.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#eef2ff', padding: '10px', borderRadius: '50%' }}>
                  <Mail size={20} color="var(--primary-blue)" />
                </div>
                <div>
                  <strong>Email Us</strong>
                  <p>noahjohnputhayathu05@gmail.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#eef2ff', padding: '10px', borderRadius: '50%' }}>
                  <Phone size={20} color="var(--primary-blue)" />
                </div>
                <div>
                  <strong>Call Us</strong>
                  <p>+91 8547728350</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#eef2ff', padding: '10px', borderRadius: '50%' }}>
                  <MapPin size={20} color="var(--primary-blue)" />
                </div>
                <div>
                  <strong>Visit Us</strong>
                  <p>Karicode,Kollam,Kerala</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="contact-form">
          <Card>
            <form onSubmit={handleSubmit}>
              <Input 
                id="name" 
                label="Your Name" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
              <Input 
                id="email" 
                label="Email Address" 
                type="email"
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
              <Input 
                id="subject" 
                label="Subject" 
                placeholder="How can we help?" 
                required 
                value={formData.subject}
                onChange={handleChange}
              />
              <Input 
                id="message" 
                label="Message" 
                type="textarea"
                placeholder="Type your message here..." 
                required 
                value={formData.message}
                onChange={handleChange}
              />
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      {/* Responsive Styles Injection */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
