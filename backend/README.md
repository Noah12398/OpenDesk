# OpenDesk Backend - README

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory (or copy from `.env.example`):

```env
SUPABASE_URL=https://yyjbpvhfpdvtbxnafkcn.supabase.co
SUPABASE_SERVICE_KEY=your_actual_service_role_key_here
PORT=5000
NODE_ENV=development
```

**IMPORTANT:** Replace `your_actual_service_role_key_here` with your actual Supabase service role key.

You can find this in your Supabase project settings under:
- Project Settings → API → Project API keys → `service_role` key (secret)

### 3. Set Up Database

Execute the schema in your Supabase SQL Editor:
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Run the contents of `schema.sql`

### 4. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Public Endpoints

- `GET /api/resources` - Fetch all approved resources
  - Query params: `category`, `pincode`, `search`
- `GET /api/resources/:id` - Fetch single resource by ID
- `POST /api/resources` - Submit new resource (sets status to 'Pending')

### Admin Endpoints

- `GET /api/resources/pending` - Fetch all pending resources
- `PATCH /api/resources/:id/approve` - Approve a pending resource
- `PATCH /api/resources/:id/reject` - Reject a pending resource

### Health Check

- `GET /health` - Server health status

## Testing

Test the API using curl:

```bash
# Health check
curl http://localhost:5000/health

# Get all resources
curl http://localhost:5000/api/resources

# Get pending resources
curl http://localhost:5000/api/resources/pending

# Submit a new resource
curl -X POST http://localhost:5000/api/resources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Library",
    "category": "Libraries",
    "address": "123 Test Street",
    "pincode": "110001",
    "coordinates": [28.6, 77.2],
    "hours": "9 AM - 5 PM",
    "facilities": ["Wi-Fi", "Books"],
    "cost": "Free",
    "description": "A test library"
  }'
```

## Project Structure

```
backend/
├── config/
│   └── supabase.js      # Supabase client configuration
├── routes/
│   └── resources.js     # Resource API routes
├── server.js            # Main Express server
├── schema.sql           # Database schema
├── package.json         # Dependencies
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
└── README.md            # This file
```

## Frontend Integration

The frontend is configured to proxy `/api` requests to this backend during development.

Make sure both servers are running:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

The Vite dev server will automatically forward API requests to the backend.
