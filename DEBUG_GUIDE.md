# Quick Debugging Guide - Resources Not Showing on Map

## ✅ Confirmed Working

- ✅ Backend API is running on port 5001
- ✅ Backend returns resources: `http://localhost:5001/api/resources`
- ✅ Database has 4 approved resources
- ✅ Service role key is configured correctly

## 🔍 Debugging Steps

### Step 1: Check Frontend is Running

Open http://localhost:5173 in your browser.

**Expected:** Page loads without errors

### Step 2: Check Browser Console

1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Look for any errors (red text)

**Common errors:**
- `Failed to fetch` - Backend not running or wrong port
- `CORS error` - CORS configuration issue
- `Network error` - Proxy not configured

### Step 3: Check Network Requests

1. Press `F12` to open Developer Tools
2. Go to **Network** tab
3. Navigate to http://localhost:5173/map
4. Look for a request to `/api/resources`

**What to check:**
- Request URL should be: `http://localhost:5173/api/resources` (proxied to backend)
- Status should be: `200 OK`
- Response should contain: `{"success":true,"data":[...]}`

**If request is missing:**
- Frontend is not calling the API
- Check `MapDiscovery.jsx` - `fetchResources()` function

**If request fails (404, 500, etc.):**
- Check backend logs for errors
- Verify proxy configuration in `vite.config.js`

### Step 4: Verify Proxy Configuration

Check `frontend/vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5001',  // Should match backend port
      changeOrigin: true,
    }
  }
}
```

**If proxy target is wrong:**
1. Update to `http://localhost:5001`
2. Restart frontend: `Ctrl+C` then `npm run dev`

### Step 5: Test API Directly

Open browser and go to:
```
http://localhost:5001/api/resources
```

**Expected:** JSON response with resources

**If this works but map doesn't:**
- Issue is in frontend code or proxy
- Check browser console for errors

### Step 6: Check Resource Data Format

Resources need these fields to display on map:
- `coordinates` - Array of [lat, lng]
- `name` - String
- `category` - String
- `status` - Should be 'Approved'

**Verify in browser console:**
```javascript
fetch('/api/resources')
  .then(r => r.json())
  .then(d => console.log(d.data))
```

## 🛠️ Quick Fixes

### Fix 1: Restart Everything

```powershell
# Stop all servers (Ctrl+C in each terminal)

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Fix 2: Clear Browser Cache

1. Press `Ctrl+Shift+Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page (`Ctrl+F5`)

### Fix 3: Check Port Configuration

**Backend `.env`:**
```
PORT=5001
```

**Frontend `vite.config.js`:**
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',
    changeOrigin: true,
  }
}
```

## ✅ Verification Checklist

Run these checks in order:

1. [ ] Backend running: `curl http://localhost:5001/health`
2. [ ] API returns resources: `curl http://localhost:5001/api/resources`
3. [ ] Frontend running: Open http://localhost:5173
4. [ ] No console errors: Check browser DevTools Console
5. [ ] Network request succeeds: Check browser DevTools Network tab
6. [ ] Resources display on map: Navigate to http://localhost:5173/map

## 📝 Expected Behavior

### When Everything Works:

1. **Map Page Loads**
   - Map displays centered on Delhi
   - Markers appear for each approved resource
   - Resource cards show in sidebar

2. **Clicking Marker**
   - Popup shows resource name
   - "View Details" button appears

3. **Resource Cards**
   - Show name, category, address
   - "View Details" button works

4. **Filters Work**
   - Category dropdown filters resources
   - Search box filters by name/address

## 🐛 Still Not Working?

### Check Backend Logs

Look at the terminal running `npm run dev` in `backend` directory.

**Look for:**
- Errors when fetching resources
- Database connection errors
- RLS policy errors

### Check Frontend Logs

Look at browser console (F12 → Console).

**Look for:**
- API call errors
- JavaScript errors
- Failed to parse JSON

### Test Complete Flow

1. **Submit a new resource:**
   - Go to http://localhost:5173/add-resource
   - Fill form and submit
   - Check if it appears in admin dashboard

2. **Approve the resource:**
   - Go to http://localhost:5173/admin
   - Click "Approve" on pending resource
   - Check if it disappears from pending

3. **Check map:**
   - Go to http://localhost:5173/map
   - Newly approved resource should appear

## 💡 Most Common Issue

**Frontend proxy not pointing to correct backend port!**

**Solution:**
1. Check `frontend/vite.config.js` - should be port `5001`
2. Check `backend/.env` - should be `PORT=5001`
3. Restart both servers
4. Hard refresh browser (`Ctrl+F5`)

---

**If you've checked everything above and it still doesn't work, share:**
1. Browser console errors (screenshot)
2. Network tab showing /api/resources request (screenshot)
3. Backend terminal output (copy/paste)
