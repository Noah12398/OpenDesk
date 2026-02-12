import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { CheckCircle, AlertCircle, MapPin, Crosshair } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { api } from '../lib/api';
import { districtCenter } from '../data/mockData';
import './AddResource.css';

// Component to handle map clicks and location updates
const LocationMarker = ({ position, setPosition, setAddress }) => {
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      // Reverse geocode to get address
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        if (data && data.display_name) {
          setAddress(data.display_name);
        }
      } catch (error) {
        console.error('Reverse geocoding failed:', error);
      }
    },
  });

  // Fly to position when it changes programmatically (e.g. GPS)
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position ? <Marker position={position} /> : null;
};

const AddResource = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Libraries',
    address: '',
    pincode: '',
    hours: '',
    contact: '',
    description: '',
    facilities: [],
    cost: 'Free'
  });
  
  // Default to district center, but try to get real location
  const [coordinates, setCoordinates] = useState(districtCenter);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const categories = ["Libraries", "Study Centers", "Free Tuition NGOs", "Public Wi-Fi", "Book Banks", "Community Classrooms"];
  const facilitiesOptions = ["Wi-Fi", "Seating", "Books", "Electricity", "Water", "Computers"];

  // Get user's current location on load
  useEffect(() => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates([position.coords.latitude, position.coords.longitude]);
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingLocation(false);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFacilityChange = (facility) => {
    setFormData(prev => {
      const facilities = prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities };
    });
  };

  const setAddressFromMap = (address) => {
    setFormData(prev => ({ ...prev, address }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = [position.coords.latitude, position.coords.longitude];
          setCoordinates(newPos);
          setLoadingLocation(false);
        },
        (error) => {
          alert("Could not get your location. Please check browser permissions.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the coordinates selected on the map
      await api.submitResource({
        name: formData.name,
        category: formData.category,
        address: formData.address,
        pincode: formData.pincode,
        hours: formData.hours,
        contact: formData.contact,
        description: formData.description,
        facilities: formData.facilities,
        cost: formData.cost,
        coordinates: coordinates,
      });

      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting resource: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container success-container">
        <Card className="success-card">
          <CheckCircle size={64} color="var(--color-success)" />
          <h2>Submission Received!</h2>
          <p>Thank you for contributing to OpenDesk. Your submission will be reviewed by our team and added to the map shortly.</p>
          <div className="success-actions">
            <Button onClick={() => navigate('/map')}>Explore Map</Button>
            <Button variant="outline" onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: '',
                category: 'Libraries',
                address: '',
                pincode: '',
                hours: '',
                contact: '',
                description: '',
                facilities: [],
                cost: 'Free'
              });
              setCoordinates(districtCenter);
            }}>Add Another</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="add-resource-page">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="page-header">
          <h1>Add a Learning Resource</h1>
          <p>Help students find free spaces to learn. All submissions are verified.</p>
        </div>

        <Card>
          <form className="resource-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <Input 
                id="name" 
                label="Resource Name" 
                placeholder="e.g. Community Library" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
              
              <div className="input-group">
                <label className="input-label">Category</label>
                <select 
                  id="category" 
                  className="input-field" 
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Map Location Picker */}
            <div className="form-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="input-label" style={{display: 'flex', alignItems: 'center', gap: '8px', margin: 0}}>
                  <MapPin size={18} /> Pin Location on Map
                </label>
                <button 
                  type="button" 
                  onClick={getCurrentLocation}
                  className="btn-text"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--primary-blue)' }}
                >
                  <Crosshair size={16} /> 
                  {loadingLocation ? 'Locating...' : 'Use My Location'}
                </button>
              </div>
              
              <div className="map-picker-container" style={{ height: '300px', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd', position: 'relative' }}>
                <MapContainer center={coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker 
                    position={coordinates} 
                    setPosition={setCoordinates}
                    setAddress={setAddressFromMap}
                  />
                </MapContainer>
              </div>
              <p className="helper-text" style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
                Tap on the map to set the exact location. We'll try to auto-fill the address for you.
              </p>
            </div>

            <Input 
              id="address" 
              label="Full Address" 
              placeholder="Building, Street, Area" 
              required 
              value={formData.address}
              onChange={handleChange}
            />

            <div className="form-grid">
              <Input 
                id="pincode" 
                label="Pincode" 
                type="number" 
                placeholder="e.g. 110001" 
                required 
                value={formData.pincode}
                onChange={handleChange}
              />
              <Input 
                id="contact" 
                label="Contact Number (Optional)" 
                type="tel" 
                placeholder="e.g. 9876543210" 
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            <div className="form-grid">
              <Input 
                id="hours" 
                label="Opening Hours" 
                placeholder="e.g. Mon-Sat 9AM - 6PM" 
                required 
                value={formData.hours}
                onChange={handleChange}
              />
              <div className="input-group">
                <label className="input-label">Cost</label>
                <select 
                  id="cost" 
                  className="input-field" 
                  value={formData.cost}
                  onChange={handleChange}
                >
                  <option value="Free">Free</option>
                  <option value="Low-cost">Low-cost</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Facilities Available</label>
              <div className="facilities-checkboxes">
                {facilitiesOptions.map(fac => (
                  <label key={fac} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={formData.facilities.includes(fac)}
                      onChange={() => handleFacilityChange(fac)}
                    />
                    <span>{fac}</span>
                  </label>
                ))}
              </div>
            </div>

            <Input 
              id="description" 
              type="textarea" 
              label="Short Description" 
              placeholder="Tell us more about this place..." 
              value={formData.description}
              onChange={handleChange}
            />

            <div className="form-info">
              <AlertCircle size={20} className="text-info" />
              <p>Your submission helps bridge the digital divide for students in need.</p>
            </div>

            <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Resource'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddResource;
