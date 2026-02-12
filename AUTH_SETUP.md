# Authentication Setup Guide

## Overview

The OpenDesk platform now includes a complete authentication system using Supabase Auth. This guide will help you set up and test the authentication features.

---

## Database Setup

### 1. Execute the Updated Schema

The authentication system requires an updated database schema. Run the following in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Create a new query
4. Copy the entire contents of `backend/schema.sql`
5. Click **Run**

This will create:
- `resources` table with `user_id` field
- `admin_users` table for admin privileges
- Row Level Security (RLS) policies for authentication
- Triggers to auto-populate `user_id` and `submitted_by`

### 2. Create Your First Admin User

After setting up the schema, you need to create an admin account:

#### Step 1: Sign up through the app
1. Start the frontend: `npm run dev` (in `frontend` directory)
2. Navigate to http://localhost:5173/signup
3. Create an account with your email and password
4. Note the email address you used

#### Step 2: Grant admin privileges
1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Find the user you just created and copy their **User UID**
3. Go to **SQL Editor** and run:

```sql
insert into admin_users (id, email, role)
values ('YOUR_USER_UID_HERE', 'your-email@example.com', 'admin');
```

Replace `YOUR_USER_UID_HERE` with the actual UID and `your-email@example.com` with your email.

---

## Testing the Authentication System

### 1. Login Flow

1. Navigate to http://localhost:5173/login
2. Enter your email and password
3. Click "Sign In"
4. You should be redirected to the admin dashboard (if you're an admin) or home page

### 2. Protected Admin Route

1. Try accessing http://localhost:5173/admin without logging in
2. You should be redirected to the login page
3. After logging in as an admin, you should have access to the admin dashboard

### 3. Resource Submission with User Tracking

1. Log in to your account
2. Navigate to "Add Resource"
3. Fill out and submit the form
4. The `submitted_by` field will automatically be populated with your email
5. Check the admin dashboard to see your submission

### 4. Logout

1. Click the "Logout" button in the header
2. You should be redirected to the home page
3. Try accessing `/admin` - you should be redirected to login

---

## Authentication Features

### For All Users

- **Signup**: Create a new account at `/signup`
- **Login**: Sign in at `/login`
- **Session Persistence**: Stay logged in across page refreshes
- **Resource Submission**: Submit resources (tracked by user email)

### For Admin Users

- **Protected Admin Dashboard**: Access at `/admin` (requires admin privileges)
- **Review Submissions**: View all pending resource submissions
- **Approve/Reject**: Manage submitted resources
- **Admin Badge**: Visible in header when logged in as admin

---

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Protected Resource Endpoints

These require authentication:

- `GET /api/resources/pending` - Fetch pending resources (admin only)
- `PATCH /api/resources/:id/approve` - Approve resource (admin only)
- `PATCH /api/resources/:id/reject` - Reject resource (admin only)
- `POST /api/resources` - Submit resource (authenticated users)

---

## Security Features

1. **JWT Tokens**: Secure token-based authentication
2. **Row Level Security**: Database-level access control
3. **Protected Routes**: Frontend route protection
4. **Admin-Only Actions**: Approve/reject restricted to admins
5. **Automatic User Tracking**: Resources linked to submitting user

---

## Troubleshooting

### "Invalid or expired token" error

- Your session may have expired
- Click "Logout" and log in again

### "Admin access required" error

- Your account doesn't have admin privileges
- Follow the "Create Your First Admin User" steps above

### Can't access admin dashboard

- Make sure you're logged in
- Verify your account has admin privileges in the `admin_users` table

### Resources not showing submitted_by email

- Make sure you're logged in when submitting
- Check that the database trigger is properly set up

---

## Next Steps

1. **Email Verification**: Enable email verification in Supabase Auth settings
2. **Password Reset**: Implement forgot password functionality
3. **OAuth Providers**: Add Google/GitHub login
4. **Role-Based Access**: Add more granular permissions
5. **Audit Logs**: Track admin actions

---

## File Structure

```
backend/
├── middleware/
│   └── auth.js              # JWT verification middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   └── resources.js         # Protected resource routes
└── schema.sql               # Updated database schema

frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state management
│   ├── components/
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── pages/
│   │   ├── Login.jsx        # Login page
│   │   └── Signup.jsx       # Signup page
│   └── lib/
│       └── api.js           # API client with auth
```

---

**Authentication system is now fully functional!** 🎉

Users can sign up, log in, and submit resources. Admins can review and approve submissions through the protected admin dashboard.
