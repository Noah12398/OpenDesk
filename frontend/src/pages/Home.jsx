import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, BookOpen, Wifi, Users, Calculator, CloudLightning } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (district.trim()) {
      navigate(`/map?search=${encodeURIComponent(district)}`);
    } else {
      navigate('/map');
    }
  };

  const categories = [
    { icon: <BookOpen size={32} />, label: "Libraries", color: "#E0F2FE", text: "#0369A1" },
    { icon: <Users size={32} />, label: "Study Centers", color: "#F0FDF4", text: "#15803D" },
    { icon: <Calculator size={32} />, label: "Free Tuition", color: "#FEF3C7", text: "#B45309" },
    { icon: <Wifi size={32} />, label: "Public Wi-Fi", color: "#F3E8FF", text: "#7E22CE" },
    { icon: <BookOpen size={32} />, label: "Book Banks", color: "#FFEDD5", text: "#C2410C" },
    { icon: <CloudLightning size={32} />, label: "Emergency", color: "#FEE2E2", text: "#B91C1C", link: "/emergency" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Find Free Places to Learn Near You</h1>
          <p className="hero-subtitle">
            connecting students to libraries, study centers, and community classrooms.
          </p>
          
          <form className="hero-search" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <MapPin className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Enter District or Pincode" 
                className="hero-input"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="search-btn">
              Search Resources
            </Button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">What are you looking for?</h2>
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <Card 
                key={index} 
                className="category-card" 
                onClick={() => navigate(cat.link || '/map')}
                style={{ backgroundColor: cat.color, color: cat.text }}
              >
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.label}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

    

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Know a place that acts as a learning center?</h2>
          <p>Help your community by adding it to our map.</p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/add-resource')}>
            Add a Resource
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
