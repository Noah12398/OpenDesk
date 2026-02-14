const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError'; 
    this.status = status;
    this.data = data;
  }
}

// Helper to get auth token
function getAuthToken() {
  return localStorage.getItem('auth_token');
}

// Helper to get headers with auth token
function getHeaders(includeAuth = false) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.error || 'An error occurred',
      response.status,
      data
    );
  }
  
  return data;
}

// API functions
export const api = {
  // ==================== Auth API ====================
  
  // Login
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Signup
  async signup(email, password, name) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password, name }),
    });
    return handleResponse(response);
  },

  // Logout
  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Get current user
  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // ==================== Resource API ====================
  
  // Fetch all approved resources with optional filters
  async fetchResources(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    
    if (filters.pincode) {
      params.append('pincode', filters.pincode);
    }
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const url = `${API_BASE_URL}/resources${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Fetch single resource by ID
  async fetchResourceById(id) {
    const response = await fetch(`${API_BASE_URL}/resources/${id}`);
    return handleResponse(response);
  },

  // Submit new resource
  async submitResource(resourceData) {
    const response = await fetch(`${API_BASE_URL}/resources`, {
      method: 'POST',
      headers: getHeaders(true), // Include auth token
      body: JSON.stringify(resourceData),
    });
    return handleResponse(response);
  },

  // Fetch pending resources (admin)
  async fetchPendingResources() {
    const response = await fetch(`${API_BASE_URL}/resources/pending`, {
      headers: getHeaders(true), // Include auth token
    });
    return handleResponse(response);
  },

  // Approve resource (admin)
  async approveResource(id) {
    const response = await fetch(`${API_BASE_URL}/resources/${id}/approve`, {
      method: 'PATCH',
      headers: getHeaders(true), // Include auth token
    });
    return handleResponse(response);
  },

  // Reject resource (admin)
  async rejectResource(id) {
    const response = await fetch(`${API_BASE_URL}/resources/${id}/reject`, {
      method: 'PATCH',
      headers: getHeaders(true), // Include auth token
    });
    return handleResponse(response);
  },
};

export default api;
