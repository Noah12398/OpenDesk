import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Zap, Wifi, BookOpen, User, Phone, Navigation, Loader } from 'lucide-react';
import { api } from '../lib/api';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './ResourceDetail.css';

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      const response = await api.fetchResourceById(id);
      setResource(response.data);
    } catch (error) {
      console.error('Error fetching resource:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <Loader className="spin" size={48} style={{ margin: '0 auto 20px', display: 'block', color: 'var(--color-primary)' }} />
        <p style={{ color: '#666' }}>Loading resource details...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Resource not found</h2>
        <Button onClick={() => navigate('/map')} variant="outline">Back to Map</Button>
      </div>
    );
  }

  const getGoogleMapsLink = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${resource.coordinates[0]},${resource.coordinates[1]}`;
  };

  const facilityIcons = {
    "Wi-Fi": <Wifi size={18} />,
    "Seating": <User size={18} />,
    "Electricity": <Zap size={18} />,
    "Books": <BookOpen size={18} />,
    "Water": <div style={{width:18, height:18, border:'1px solid currentColor', borderRadius:'50%'}}>W</div>, // fallback
  };

  return (
    <div className="detail-page">
      <div className="container">
        <Button variant="ghost" className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </Button>

        <Card className="detail-card">
          <div className="detail-header">
            <div>
              <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'8px'}}>
                <Badge variant={resource.cost === 'Free' ? 'success' : 'warning'}>{resource.cost}</Badge>
                <span className="detail-category">{resource.category}</span>
              </div>
              <h1>{resource.name}</h1>
            </div>
            <Button 
              className="directions-btn hidden-mobile" 
              onClick={() => window.open(getGoogleMapsLink(), '_blank')}
            >
              <Navigation size={18} /> Get Directions
            </Button>
          </div>

          <div className="detail-grid">
            <div className="detail-info">
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h3>Address</h3>
                  <p>{resource.address}</p>
                </div>
              </div>

              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <h3>Hours</h3>
                  <p>{resource.hours}</p>
                </div>
              </div>

              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h3>Contact</h3>
                  <p>{resource.contact}</p>
                </div>
              </div>

              <div className="info-desc">
                <h3>About</h3>
                <p>{resource.description}</p>
              </div>
            </div>

            <div className="detail-facilities">
              <h3>Facilities Available</h3>
              <div className="facilities-list">
                {resource.facilities.map((fac, i) => (
                  <div key={i} className="facility-item">
                    {facilityIcons[fac] || <Zap size={18} />}
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            className="directions-btn-mobile hidden-desktop" 
            fullWidth 
            size="lg"
            onClick={() => window.open(getGoogleMapsLink(), '_blank')}
          >
            <Navigation size={20} /> Get Directions
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ResourceDetail;
