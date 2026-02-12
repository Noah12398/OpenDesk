# OpenDesk Functionality Test Script

## Test 1: Backend API Health Check

```powershell
# Test backend is running
curl http://localhost:5001/health
```

**Expected Output:**
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "OpenDesk API"
}
```

---

## Test 2: Fetch Approved Resources

```powershell
# Get all approved resources
curl http://localhost:5001/api/resources
```

**Expected Output:**
```json
{
  "success": true,
  "data": [...],
  "count": X
}
```

---

## Test 3: Complete Resource Submission & Approval Flow

### Step 1: Sign Up (if needed)
1. Go to http://localhost:5173/signup
2. Create account with email/password
3. Note your email address

### Step 2: Make User an Admin
```sql
-- In Supabase SQL Editor
-- First, get your user ID from Authentication → Users
insert into admin_users (id, email, role)
values ('YOUR_USER_ID', 'your-email@example.com', 'admin');
```

### Step 3: Submit a Resource
1. Log in at http://localhost:5173/login
2. Go to "Add Resource"
3. Fill out the form:
   - **Name**: Test Library
   - **Category**: Libraries
   - **Address**: 123 Test Street, Delhi
   - **Pincode**: 110001
   - **Coordinates**: 28.6139, 77.2090
   - **Hours**: 9 AM - 5 PM
   - **Facilities**: Wi-Fi, Books
   - **Cost**: Free
   - **Contact**: 9876543210
   - **Description**: Test resource for verification
4. Click "Submit Resource"
5. Should see success message

### Step 4: Approve the Resource
1. Go to http://localhost:5173/admin
2. You should see your submitted resource in "Pending Submissions"
3. Click the ✓ "Approve" button
4. Resource should disappear from pending list

### Step 5: Verify on Map
1. Go to http://localhost:5173/map
2. The approved resource should now appear on the map
3. Click the marker to see details
4. Click "View Details" to see full resource page

---

## Test 4: API Endpoint Testing

### Test Pending Resources (Admin Only)

```powershell
# First, login and get token
$loginResponse = curl -Method POST -Uri "http://localhost:5001/api/auth/login" `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"your-email@example.com","password":"your-password"}' | ConvertFrom-Json

$token = $loginResponse.data.session.access_token

# Fetch pending resources
curl -Uri "http://localhost:5001/api/resources/pending" `
  -Headers @{"Authorization"="Bearer $token"}
```

### Test Approve Resource

```powershell
# Approve resource (replace RESOURCE_ID)
curl -Method PATCH -Uri "http://localhost:5001/api/resources/RESOURCE_ID/approve" `
  -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"}
```

---

## Test 5: Frontend Functionality Checklist

### Home Page
- [ ] Page loads without errors
- [ ] "Explore Resources Near You" button works
- [ ] Navigation links work

### Map Discovery
- [ ] Map loads and displays markers
- [ ] Can click on markers to see popup
- [ ] Category filter works
- [ ] Search box filters resources
- [ ] "View Details" button works
- [ ] Resource cards display correct information

### Add Resource
- [ ] Form loads correctly
- [ ] All fields are present
- [ ] Form validation works (try submitting empty)
- [ ] Success message appears after submission
- [ ] Submitted resource appears in admin dashboard

### Admin Dashboard (Requires Admin Login)
- [ ] Login redirects to admin dashboard
- [ ] Pending submissions table loads
- [ ] Statistics cards show correct counts
- [ ] "Approve" button works
- [ ] "Reject" button works
- [ ] Approved resources disappear from pending list

### Resource Detail Page
- [ ] Page loads with resource information
- [ ] All fields display correctly
- [ ] "Get Directions" button works
- [ ] "Back to Map" button works

### Authentication
- [ ] Signup page works
- [ ] Login page works
- [ ] Logout button works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Admin badge shows in header for admins
- [ ] User email displays in header when logged in

---

## Common Issues & Solutions

### Issue: Approved resources not showing on map

**Possible Causes:**
1. Frontend is not fetching resources correctly
2. Backend is not returning approved resources
3. Database RLS policies are blocking access

**Debug Steps:**
```powershell
# 1. Check if backend returns resources
curl http://localhost:5001/api/resources

# 2. Check browser console for errors
# Open DevTools (F12) → Console tab

# 3. Check Network tab
# Open DevTools (F12) → Network tab
# Refresh map page
# Look for /api/resources request
# Check response
```

**Solution:**
- Ensure backend is running on correct port (5001)
- Check `frontend/vite.config.js` proxy points to correct port
- Verify resources have `status = 'Approved'` in database
- Check browser console for CORS or network errors

### Issue: "Invalid or expired token" error

**Solution:**
- Logout and login again
- Clear localStorage: `localStorage.clear()` in browser console
- Check that service role key is correct in `backend/.env`

### Issue: Admin dashboard shows "Access Denied"

**Solution:**
- Verify user is in `admin_users` table:
```sql
select * from admin_users where email = 'your-email@example.com';
```
- If not, add them:
```sql
insert into admin_users (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'your-email@example.com';
```

### Issue: Port 5001 already in use

**Solution:**
```powershell
# Find process using port 5001
netstat -ano | findstr :5001

# Kill the process (replace PID)
taskkill /F /PID <PID>

# Restart backend
cd backend
npm run dev
```

---

## Quick Test Commands

```powershell
# Test everything is running
curl http://localhost:5001/health
curl http://localhost:5173

# Test API returns resources
curl http://localhost:5001/api/resources | ConvertFrom-Json | Select-Object -ExpandProperty data | Format-Table name, category, status

# Count approved resources
(curl http://localhost:5001/api/resources | ConvertFrom-Json).count
```

---

## Expected Behavior Summary

1. **Public users** can:
   - View approved resources on map
   - Submit new resources (when logged in)
   - View resource details

2. **Admin users** can:
   - Do everything public users can
   - Access admin dashboard
   - View pending submissions
   - Approve/reject resources

3. **Resource flow**:
   - User submits → Status: Pending
   - Admin approves → Status: Approved
   - Approved resources appear on public map
   - Rejected resources don't appear anywhere

---

## Success Criteria

✅ All API endpoints return expected responses  
✅ Resources can be submitted via form  
✅ Admins can approve/reject submissions  
✅ Approved resources appear on map  
✅ Authentication works (login/logout)  
✅ Protected routes are secured  
✅ No console errors in browser  
✅ No server errors in backend logs  

---

**If all tests pass, the OpenDesk platform is fully functional!** 🎉
