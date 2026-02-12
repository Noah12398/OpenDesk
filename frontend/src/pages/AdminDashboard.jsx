import React, { useState, useEffect } from 'react';
import { Check, X, Eye, Loader } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import { api } from '../lib/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingResources();
  }, []);

  const fetchPendingResources = async () => {
    try {
      const response = await api.fetchPendingResources();
      setSubmissions(response.data || []);
    } catch (error) {
      console.error('Error fetching pending resources:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') {
        await api.approveResource(id);
      } else {
        await api.rejectResource(id);
      }
      
      // Remove from list after successful action
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      alert(`Submission ${action === 'approve' ? 'Approved' : 'Rejected'} successfully!`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Review and manage community submissions.</p>
        </div>

        <div className="stats-grid">
          <Card className="stat-card">
            <h3>Pending</h3>
            <p className="stat-value">{submissions.length}</p>
          </Card>
          <Card className="stat-card">
            <h3>Approved</h3>
            <p className="stat-value">1,245</p>
          </Card>
          <Card className="stat-card">
            <h3>Rejected</h3>
            <p className="stat-value">32</p>
          </Card>
        </div>

        <Card className="table-card">
          <div className="table-header">
            <h3>Pending Submissions</h3>
          </div>
          
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <Loader className="spin" size={32} style={{ margin: '0 auto 10px', display: 'block' }} />
              Loading pending submissions...
            </div>
          ) : submissions.length === 0 ? (
            <div className="empty-state">
              <p>No pending submissions to review.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Resource Name</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Submitted By</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id}>
                      <td>
                        <span className="fw-600">{sub.name}</span>
                      </td>
                      <td><Badge variant="blue">{sub.category}</Badge></td>
                      <td>{sub.address}</td>
                      <td>{sub.submitted_by || 'Anonymous'}</td>
                      <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn btn-view" title="View Details">
                            <Eye size={16} />
                          </button>
                          <button 
                            className="action-btn btn-approve" 
                            title="Approve"
                            onClick={() => handleAction(sub.id, 'approve')}
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            className="action-btn btn-reject" 
                            title="Reject"
                            onClick={() => handleAction(sub.id, 'reject')}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
