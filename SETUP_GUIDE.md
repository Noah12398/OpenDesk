# OpenDesk - Quick Setup Guide

## 🚀 Getting Started

Your OpenDesk platform is now fully functional with a complete backend! Follow these steps to get everything running.

---

## Step 1: Configure Supabase Service Key

> **IMPORTANT:** The backend needs your Supabase service role key to connect to the database.

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `yyjbpvhfpdvtbxnafkcn`
3. Navigate to: **Settings** → **API** → **Project API keys**
4. Copy the **`service_role`** key (marked as secret)
5. Open `backend/.env` and replace the placeholder:

```env
SUPABASE_SERVICE_KEY=paste_your_actual_key_here
```

---

## Step 2: Set Up Database

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Create a new query
4. Copy the entire contents of `backend/schema.sql`
5. Paste and click **Run**

This will create:
- `resources` table with all fields
- Row Level Security policies
- 8 sample resources for testing

---

## Step 3: Start the Servers

### Terminal 1 - Backend Server

```bash
cd backend
npm install    # if not already done
npm run dev
```

You should see:
```
🚀 OpenDesk API server running on http://localhost:5000
📊 Environment: development
🔗 Health check: http://localhost:5000/health
```

### Terminal 2 - Frontend Server

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v7.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

---

## Step 4: Test the Application

### Open in Browser

Navigate to: **http://localhost:5173**

### Test Flow

1. **Home Page**
   - Should load with hero section
   - Click "Explore Resources Near You"

2. **Map Discovery**
   - Should show interactive map with resource markers
   - Try filtering by category
   - Click on a marker to see details
   - Click "View Details" on a resource card

3. **Resource Details**
   - Should show full information about the resource
   - "Get Directions" button should work

4. **Add Resource**
   - Fill out the form
   - Submit a new resource
   - Should see success message

5. **Admin Dashboard**
   - Should show pending submissions
   - Click "Approve" on a pending resource
   - Resource should disappear from pending list
   - Go back to map - approved resource should now appear!

---

## Verification Checklist

✅ Backend server running on port 5000  
✅ Frontend server running on port 5173  
✅ Database schema executed in Supabase  
✅ Service role key configured in `.env`  
✅ Resources load on map page  
✅ Can submit new resources  
✅ Can approve/reject in admin dashboard  
✅ Approved resources appear on map  

---

## Troubleshooting

### "Invalid API key" error

- Check that you've updated `backend/.env` with the real service role key
- Restart the backend server after updating `.env`

### Resources not loading

- Verify database schema was executed successfully
- Check backend terminal for error messages
- Open browser console (F12) to see API errors

### CORS errors

- Make sure backend is running on port 5000
- Make sure frontend is running on port 5173
- Check that Vite proxy is configured (already done)

### Port already in use

Backend:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Frontend:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                       │
│                 http://localhost:5173                   │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ HTTP Requests
                        │ /api/*
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Vite Dev Server (Proxy)                    │
│                                                         │
│  Forwards /api/* → http://localhost:5000                │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Express Backend Server                     │
│              http://localhost:5000                      │
│                                                         │
│  Routes:                                                │
│  • GET    /api/resources                                │
│  • GET    /api/resources/:id                            │
│  • POST   /api/resources                                │
│  • GET    /api/resources/pending                        │
│  • PATCH  /api/resources/:id/approve                    │
│  • PATCH  /api/resources/:id/reject                     │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ Supabase Client
                        │ (Service Role Key)
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Supabase PostgreSQL                        │
│       https://yyjbpvhfpdvtbxnafkcn.supabase.co          │
│                                                         │
│  Tables:                                                │
│  • resources (with RLS policies)                        │
└─────────────────────────────────────────────────────────┘
```

---

## What's Next?

### Production Deployment

1. **Backend**: Deploy to Railway, Render, or Vercel
2. **Frontend**: Deploy to Vercel or Netlify
3. **Environment**: Update CORS origins for production URL
4. **Database**: Already on Supabase (production-ready)

### Feature Enhancements

- Add admin authentication
- Integrate Google Maps Geocoding API
- Add email notifications for approvals
- Implement search with filters
- Add resource ratings/reviews
- Export resources as CSV

---

## Support

For issues or questions:
1. Check browser console for errors (F12)
2. Check backend terminal for server logs
3. Review the [Backend README](file:///c:/Users/hp/Desktop/OpenDesk/backend/README.md)
4. Review the [Walkthrough](file:///C:/Users/hp/.gemini/antigravity/brain/a2a89278-a753-4201-90a2-389ddfd7000e/walkthrough.md)

---

**You're all set! 🎉**

The OpenDesk platform is now fully functional with a complete backend infrastructure. Happy coding!
