# OpenDesk 🎓

**Public Learning Resources Map for Every Student**

OpenDesk is a community-driven platform that helps students discover free and low-cost learning resources like libraries, study centers, public Wi-Fi zones, and educational NGOs in their area.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

---

## 🌟 Features

### For Students
- 🗺️ **Interactive Map** - Discover learning resources on an interactive map
- 🔍 **Smart Search** - Filter by category, location, and search terms
- 📍 **Location-Based** - Find resources near you using pincode
- 📱 **Mobile-Friendly** - Fully responsive design for all devices
- ✅ **Verified Resources** - All resources are reviewed before publishing

### For Contributors
- ➕ **Add Resources** - Submit new learning resources to help the community
- 👤 **User Tracking** - Submissions are linked to your account
- 📊 **Track Submissions** - See the status of your submitted resources

### For Admins
- 🔐 **Secure Dashboard** - Protected admin panel with authentication
- ✅ **Review Submissions** - Approve or reject community submissions
- 📈 **Statistics** - View pending, approved, and rejected counts
- 👥 **User Management** - Track who submitted each resource

---

## 🚀 Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router** - Client-side routing
- **Leaflet** - Interactive maps
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Supabase** - PostgreSQL database & authentication
- **JWT** - Token-based authentication

---

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone https://github.com/Noah12398/OpenDesk.git
cd OpenDesk
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your Supabase credentials
# SUPABASE_URL=your_supabase_url
# SUPABASE_SERVICE_KEY=your_service_role_key
# PORT=5001
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `backend/schema.sql`
4. Paste and execute in SQL Editor

### 4. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env.local file
cp .env.example .env.local

# Update with your Supabase credentials
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

---

## 🔐 Authentication Setup
Already existing admin:
email-darwinmaxwell05@gmail.com
password-Qwerty123?
### Create Your First Admin User

1. **Sign up** through the app at http://localhost:5173/signup
2. **Get your User ID** from Supabase Dashboard → Authentication → Users
3. **Grant admin privileges** by running this SQL query:

```sql
insert into admin_users (id, email, role)
values ('YOUR_USER_ID', 'your-email@example.com', 'admin');
```

See [AUTH_SETUP.md](AUTH_SETUP.md) for detailed instructions.

---

## 📖 Usage

### For Students

1. **Browse Resources**
   - Visit the map page to see all approved resources
   - Use filters to find specific types of resources
   - Click markers for details

2. **Submit Resources**
   - Create an account and log in
   - Go to "Add Resource"
   - Fill out the form with resource details
   - Your submission will be reviewed by admins

### For Admins

1. **Login** at http://localhost:5173/login
2. **Access Admin Dashboard** at http://localhost:5173/admin
3. **Review Submissions**
   - View all pending submissions
   - Click ✓ to approve or ✗ to reject
4. **Approved resources** automatically appear on the public map

---

## 🗂️ Project Structure

```
OpenDesk/
├── backend/
│   ├── config/
│   │   └── supabase.js          # Supabase client configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   └── resources.js         # Resource CRUD endpoints
│   ├── schema.sql               # Database schema
│   ├── server.js                # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable UI components
│   │   │   ├── layout/          # Layout components (Header, Footer)
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication state management
│   │   ├── lib/
│   │   │   ├── api.js           # API client
│   │   │   └── supabase.js      # Supabase client
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── MapDiscovery.jsx
│   │   │   ├── AddResource.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   └── App.jsx
│   └── package.json
│
├── .gitignore
├── README.md
├── AUTH_SETUP.md
├── DEBUG_GUIDE.md
└── TESTING_GUIDE.md
```

---

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources` | Get all approved resources |
| GET | `/api/resources/:id` | Get single resource by ID |
| GET | `/health` | Health check |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user info |

### Protected Endpoints (Require Authentication)

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| POST | `/api/resources` | Submit new resource | Authenticated |
| GET | `/api/resources/pending` | Get pending resources | Admin |
| PATCH | `/api/resources/:id/approve` | Approve resource | Admin |
| PATCH | `/api/resources/:id/reject` | Reject resource | Admin |

---

## 🧪 Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing instructions.

### Quick Test

```bash
# Test backend health
curl http://localhost:5001/health

# Test API returns resources
curl http://localhost:5001/api/resources
```

---

## 🐛 Troubleshooting

See [DEBUG_GUIDE.md](DEBUG_GUIDE.md) for common issues and solutions.

### Common Issues

**Resources not showing on map?**
- Check browser console for errors (F12)
- Verify backend is running on port 5001
- Check proxy configuration in `vite.config.js`

**"Invalid token" error?**
- Logout and login again
- Clear localStorage in browser console

**Admin access denied?**
- Verify you're in the `admin_users` table
- Check Supabase dashboard → Authentication

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for students who need access to learning resources
- Inspired by the need to bridge the digital divide in education
- Special thanks to the open-source community

---

## 📞 Support

For issues or questions:
1. Check the [DEBUG_GUIDE.md](DEBUG_GUIDE.md)
2. Review [TESTING_GUIDE.md](TESTING_GUIDE.md)
3. Open an issue on GitHub

---

## 🎯 Roadmap

- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] OAuth providers (Google, GitHub)
- [ ] Mobile app (React Native)
- [ ] Resource ratings and reviews
- [ ] Advanced search with filters
- [ ] Export resources as CSV
- [ ] Multilingual support

---

**Made with ❤️ for students everywhere**
