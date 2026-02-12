import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { api } from '../lib/api';
import { districtCenter } from '../data/mockData';
import './AddResource.css';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = ["Libraries", "Study Centers", "Free Tuition NGOs", "Public Wi-Fi", "Book Banks", "Community Classrooms"];
  const facilitiesOptions = ["Wi-Fi", "Seating", "Books", "Electricity", "Water", "Computers"];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock coordinates generation (random offset from center for demo)
    // In a real app, we would use a Geocoding API here
    const mockLat = districtCenter[0] + (Math.random() - 0.5) * 0.05;
    const mockLng = districtCenter[1] + (Math.random() - 0.5) * 0.05;

    try {
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
        coordinates: [mockLat, mockLng],
      });

      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
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
