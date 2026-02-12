import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { districtCenter } from '../data/mockData'; // Keep districtCenter or move to constants
import { api } from '../lib/api';
import { MapPin, Search, Filter, List, Map as MapIcon, Loader } from 'lucide-react';
import './MapDiscovery.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapDiscovery = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showList, setShowList] = useState(true); // Toggle for mobile
  const [activeResource, setActiveResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Libraries", "Study Centers", "Free Tuition NGOs", "Public Wi-Fi", "Book Banks", "Community Classrooms"];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.fetchResources();
      console.log('Fetched resources:', response.data);
      setResources(response.data || []);
    } catch (error) {
      console.error('Error fetching resources:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter resources
  const filteredResources = resources.filter(res => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = res.name.toLowerCase().includes(term) || 
                          res.address.toLowerCase().includes(term) ||
                          (res.pincode && res.pincode.includes(term));
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="map-page">
      {/* Sidebar / List View */}
      <div className={`map-sidebar ${showList ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="search-box">
             <Input 
              placeholder="Search resource or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="map-search-input"
            />
          </div>
          
          <div className="filter-chips">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="resource-list">
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              <Loader className="spin" size={24} style={{ margin: '0 auto 10px', display: 'block' }} />
              Loading resources...
            </div>
          ) : (
            <>
              <div className="results-count">
                {filteredResources.length} resources found
              </div>
              {filteredResources.map(res => (
                <Card 
                  key={res.id} 
                  className={`resource-item ${activeResource === res.id ? 'active-card' : ''}`}
                  onClick={() => setActiveResource(res.id)}
                >
                  <div className="resource-header">
                    <h3>{res.name}</h3>
                    <Badge variant={res.cost === 'Free' ? 'success' : 'warning'}>{res.cost}</Badge>
                  </div>
                  <p className="resource-category">{res.category}</p>
                  <p className="resource-address"><MapPin size={14} /> {res.address}</p>
                  <div className="resource-facilities">
                    {res.facilities && res.facilities.slice(0, 3).map((fac, i) => (
                      <span key={i} className="facility-tag">{fac}</span>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" fullWidth style={{marginTop: '10px'}} onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/resource/${res.id}`);
                  }}>
                    View Details
                  </Button>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="map-container">
        <MapContainer center={districtCenter} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!loading && filteredResources.map(res => {
            // Validate coordinates
            const isValidCoordinate = Array.isArray(res.coordinates) && 
                                     res.coordinates.length === 2 && 
                                     !isNaN(res.coordinates[0]) && 
                                     !isNaN(res.coordinates[1]);
            
            if (!isValidCoordinate) {
              console.warn(`Skipping resource ${res.name} (ID: ${res.id}) due to invalid coordinates:`, res.coordinates);
              return null;
            }

            return (
              <Marker 
                key={res.id} 
                position={res.coordinates}
                eventHandlers={{
                  click: () => {
                    setActiveResource(res.id);
                    setShowList(true); // Show list on mobile when clicked
                  },
                }}
              >
                <Popup>
                  <strong>{res.name}</strong><br />
                  {res.category}<br />
                  {res.address}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        
        {/* Mobile Toggle Button */}
        <button className="map-toggle-btn hidden-desktop" onClick={() => setShowList(!showList)}>
          {showList ? <MapIcon size={24} /> : <List size={24} />}
          {showList ? "Show Map" : "Show List"}
        </button>
      </div>
    </div>
  );
};

export default MapDiscovery;
