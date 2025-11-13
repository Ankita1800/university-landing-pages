# University Landing Pages Project

Complete implementation of landing pages for MIT and Delhi University with lead form integration and REST APIs.

## 🎯 Project Components

### 1. Landing Pages
- **MIT Landing Page** (`/mit-landing/`)
- **Delhi University Landing Page** (`/delhi-university-landing/`)
- Fully responsive (mobile & desktop)
- Modern UI/UX with Tailwind CSS
- Lead form modals with Pipedream integration

### 2. API Backend (`/api-backend/`)
RESTful APIs with simple and nested JSON responses

### 3. Lead Form Integration
Pipedream webhook integration for form submissions

---

## 📋 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Pipedream account (free)

### Local Development

#### 1. Install API Backend Dependencies
```bash
cd api-backend
npm install
```

#### 2. Start the API Server
```bash
npm start
```
Server will run on `http://localhost:3000`

#### 3. Open Landing Pages
- MIT: Open `mit-landing/index.html` in browser
- Delhi University: Open `delhi-university-landing/index.html` in browser

---

## 🔗 Pipedream Integration Setup

### Step 1: Create Pipedream Workflow

1. Go to [Pipedream.com](https://pipedream.com) and sign up/login
2. Click **"New Workflow"**
3. Select **"HTTP / Webhook"** as trigger
4. Choose **"New Requests"**
5. Copy the webhook URL (e.g., `https://eodq2e90anw6xqz.m.pipedream.net`)

### Step 2: Configure Workflow Steps

Add these steps to your Pipedream workflow:

#### Step 1: HTTP Trigger
- Accepts POST requests with lead form data

#### Step 2: Node.js Code (Process Data)
```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const lead = steps.trigger.event.body;
    
    // Validate data
    if (!lead.name || !lead.email || !lead.phone) {
      throw new Error("Missing required fields");
    }
    
    // Return formatted data
    return {
      leadId: Date.now(),
      ...lead,
      processedAt: new Date().toISOString()
    };
  },
})
```

#### Step 3: Send Email Notification (Optional)
- Use "Email by Pipedream" action
- Send notification to admissions team

#### Step 4: Save to Google Sheets (Optional)
- Connect Google Sheets
- Add row with lead data

#### Step 5: Send to Slack (Optional)
- Connect Slack workspace
- Post lead notification to channel

### Step 3: Update Webhook URL

Replace the Pipedream URL in both script files:

**File: `mit-landing/script.js`**
```javascript
const PIPEDREAM_WEBHOOK_URL = 'YOUR_PIPEDREAM_URL_HERE';
```

**File: `delhi-university-landing/script.js`**
```javascript
const PIPEDREAM_WEBHOOK_URL = 'YOUR_PIPEDREAM_URL_HERE';
```

### Step 4: Test the Integration

1. Open a landing page
2. Click "Apply Now" or "Get Started"
3. Fill out the form
4. Submit and check Pipedream dashboard for received data

---

## 🌐 API Endpoints

### Base URL: `http://localhost:3000`

### 📍 Complete API Reference

#### 1. Health Check (Simple JSON)
```
GET /api/health
```
**Purpose**: Check if API server is running  
**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-13T10:30:00.000Z",
  "uptime": 3600
}
```

---

#### 2. Get All Universities (Simple JSON)
```
GET /api/universities
```
**Purpose**: Get list of all universities  
**Response**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Massachusetts Institute of Technology",
      "abbreviation": "MIT",
      "location": "Cambridge, MA, USA",
      "established": 1861
    },
    {
      "id": 2,
      "name": "University of Delhi",
      "abbreviation": "DU",
      "location": "Delhi, India",
      "established": 1922
    }
  ]
}
```

---

#### 3. Get University Details (Nested JSON)
```
GET /api/universities/:id
```
**Purpose**: Get detailed information for a specific university  
**Parameters**: `id` = `mit` or `delhi-university`  
**Examples**:
- `GET /api/universities/mit`
- `GET /api/universities/delhi-university`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Massachusetts Institute of Technology",
    "abbreviation": "MIT",
    "location": {
      "city": "Cambridge",
      "state": "Massachusetts",
      "country": "USA",
      "coordinates": {
        "latitude": 42.3601,
        "longitude": -71.0942
      }
    },
    "contact": {
      "phone": "+1-617-253-1000",
      "email": "admissions@mit.edu",
      "website": "https://www.mit.edu"
    },
    "programs": [
      {
        "id": 1,
        "name": "Engineering",
        "degrees": ["Bachelor's", "Master's", "PhD"],
        "departments": ["Electrical", "Mechanical", "Computer Science"]
      }
    ],
    "statistics": {
      "students": {
        "total": 11520,
        "undergraduate": 4638,
        "graduate": 6882
      },
      "faculty": 1074,
      "acceptanceRate": "3.9%",
      "ranking": 1
    }
  }
}
```

---

#### 4. Get Programs (Simple JSON)
```
GET /api/programs
```
**Purpose**: Get list of all available programs  
**Response**:
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 1,
      "name": "Computer Science",
      "degree": "Bachelor's",
      "duration": "4 years"
    },
    {
      "id": 2,
      "name": "Engineering",
      "degree": "Bachelor's",
      "duration": "4 years"
    }
  ]
}
```

---

#### 5. Get Admissions Info (Nested JSON)
```
GET /api/admissions
```
**Purpose**: Get detailed admissions information and requirements  
**Response**:
```json
{
  "success": true,
  "data": {
    "applicationProcess": {
      "steps": [
        {
          "step": 1,
          "title": "Online Application",
          "description": "Complete the application form"
        }
      ]
    },
    "requirements": {
      "academic": {
        "minimumGPA": 3.5,
        "standardizedTests": ["SAT", "ACT"]
      },
      "documents": [
        "Transcripts",
        "Letters of Recommendation",
        "Personal Statement"
      ]
    },
    "deadlines": {
      "earlyAction": "2025-11-01",
      "regularDecision": "2026-01-01"
    }
  }
}
```

---

#### 6. Get Statistics (Nested JSON)
```
GET /api/statistics
```
**Purpose**: Get comprehensive university statistics  
**Response**:
```json
{
  "success": true,
  "data": {
    "enrollment": {
      "total": 11520,
      "byLevel": {
        "undergraduate": 4638,
        "graduate": 6882
      }
    },
    "demographics": {
      "international": "33%",
      "women": "48%"
    },
    "outcomes": {
      "graduationRate": "94%",
      "employmentRate": "92%"
    }
  }
}
```

---

#### 7. Get Course-wise Fees (Nested JSON) ⭐ NEW
```
GET /api/fees/:university
```
**Purpose**: Get detailed fee structure for all courses  
**Parameters**: `university` = `mit` or `delhi-university`  
**Examples**:
- `GET /api/fees/mit`
- `GET /api/fees/delhi-university`

**MIT Response**:
```json
{
  "success": true,
  "university": "MIT",
  "currency": "USD",
  "data": {
    "undergraduate": [
      {
        "course": "B.Tech Computer Science",
        "duration": "4 years",
        "tuitionFee": 57878,
        "additionalFees": 1000,
        "totalAnnual": 58878,
        "totalProgram": 235512
      },
      {
        "course": "B.Tech Electrical Engineering",
        "duration": "4 years",
        "tuitionFee": 57878,
        "additionalFees": 1000,
        "totalAnnual": 58878,
        "totalProgram": 235512
      }
    ],
    "postgraduate": [
      {
        "course": "M.Tech Computer Science",
        "duration": "2 years",
        "tuitionFee": 57878,
        "additionalFees": 1200,
        "totalAnnual": 59078,
        "totalProgram": 118156
      },
      {
        "course": "MBA (Sloan School)",
        "duration": "2 years",
        "tuitionFee": 85000,
        "additionalFees": 1500,
        "totalAnnual": 86500,
        "totalProgram": 173000
      }
    ],
    "phd": [
      {
        "course": "PhD Programs (All Disciplines)",
        "duration": "4-6 years",
        "tuitionFee": "Fully Funded",
        "note": "Full tuition waiver + stipend provided"
      }
    ]
  }
}
```

**Delhi University Response**:
```json
{
  "success": true,
  "university": "Delhi University",
  "currency": "INR",
  "data": {
    "undergraduate": [
      {
        "course": "B.A. Economics",
        "duration": "3 years",
        "tuitionFee": 15000,
        "additionalFees": 2000,
        "totalAnnual": 17000,
        "totalProgram": 51000
      },
      {
        "course": "B.Sc. Computer Science",
        "duration": "3 years",
        "tuitionFee": 25000,
        "additionalFees": 3000,
        "totalAnnual": 28000,
        "totalProgram": 84000
      }
    ],
    "postgraduate": [
      {
        "course": "M.A. Economics",
        "duration": "2 years",
        "tuitionFee": 18000,
        "additionalFees": 2500,
        "totalAnnual": 20500,
        "totalProgram": 41000
      },
      {
        "course": "MBA",
        "duration": "2 years",
        "tuitionFee": 100000,
        "additionalFees": 10000,
        "totalAnnual": 110000,
        "totalProgram": 220000
      }
    ],
    "phd": [
      {
        "course": "PhD Programs (All Disciplines)",
        "duration": "3-5 years",
        "tuitionFee": 8000,
        "additionalFees": 2000,
        "totalAnnual": 10000,
        "note": "Scholarship available for eligible candidates"
      }
    ]
  }
}
```

---

#### 8. Get Indian States (Simple JSON) ⭐ NEW
```
GET /api/states
```
**Purpose**: Get list of all Indian states and Union Territories (for dropdown forms)  
**Response**:
```json
{
  "success": true,
  "count": 36,
  "data": [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ]
}
```

---

#### 9. Submit Lead Form (POST)
```
POST /api/leads
Content-Type: application/json
```
**Purpose**: Submit lead form data from landing pages  
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Maharashtra",
  "course": "B.Tech Computer Science",
  "intakeYear": "2025",
  "message": "Interested in admission",
  "consent": true,
  "university": "MIT"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "id": 1699876543210,
    "status": "pending",
    "createdAt": "2025-11-13T10:30:00.000Z"
  }
}
```

---

### 📊 Quick Reference - All API Endpoints

| Method | Endpoint | Purpose | Type |
|--------|----------|---------|------|
| GET | `/api/health` | Health check | Simple JSON |
| GET | `/api/universities` | List all universities | Simple JSON |
| GET | `/api/universities/:id` | Get university details | Nested JSON |
| GET | `/api/programs` | List all programs | Simple JSON |
| GET | `/api/admissions` | Get admissions info | Nested JSON |
| GET | `/api/statistics` | Get university statistics | Nested JSON |
| GET | `/api/fees/:university` | Get course-wise fees | Nested JSON |
| GET | `/api/states` | Get Indian states list | Simple JSON |
| POST | `/api/leads` | Submit lead form | POST Request |

---

### 🔗 Landing Page URLs

| University | URL |
|------------|-----|
| MIT | `http://localhost:3000/mit` |
| Delhi University | `http://localhost:3000/delhi-university` |

---

## 🚀 Deployment Guide

### Option 1: Netlify (Recommended for Landing Pages)

#### Deploy Landing Pages
1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Set publish directory to `/` (will serve both landing pages)
6. Click "Deploy"

#### Custom Domain & SSL
- Netlify provides free SSL automatically
- Add custom domain in Site Settings → Domain Management

### Option 2: Vercel (For Landing Pages)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to project root
3. Run: `vercel`
4. Follow prompts
5. Free SSL included

### Option 3: Render (For API Backend)

#### Deploy API Backend
1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Click "New" → "Web Service"
4. Connect your repository
5. Set:
   - Build Command: `cd api-backend && npm install`
   - Start Command: `cd api-backend && npm start`
   - Environment: Node
6. Click "Create Web Service"
7. Free SSL included

### Option 4: Railway (For API Backend)

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select repository
4. Railway auto-detects Node.js
5. Set root directory to `/api-backend`
6. Deploy

### Option 5: GitHub Pages (For Landing Pages Only)

1. Go to repository Settings → Pages
2. Select branch (main) and folder (root)
3. Save
4. Site will be live at `https://username.github.io/repo-name`

---

## 📱 Mobile Responsive Testing

### Test on Multiple Devices
- Chrome DevTools (F12 → Device Toolbar)
- Firefox Responsive Design Mode
- Safari Web Inspector

### Breakpoints Used
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🎨 Features

### Landing Pages
- ✅ Hero sections with CTAs
- ✅ About sections
- ✅ Programs showcase
- ✅ Contact sections
- ✅ Mobile hamburger menus
- ✅ Smooth scroll navigation
- ✅ University switcher buttons
- ✅ Lead form modals

### Lead Forms
- ✅ Form validation
- ✅ Pipedream webhook integration
- ✅ Success/error messaging
- ✅ Modal functionality
- ✅ Responsive design

### API Backend
- ✅ 7 REST endpoints
- ✅ Simple JSON responses
- ✅ Nested JSON responses
- ✅ CORS enabled
- ✅ Error handling

---

## 🧪 Testing

### Test Landing Pages
1. Open each landing page in browser
2. Test all buttons (Apply Now, Get Started, Contact)
3. Fill and submit lead form
4. Check Pipedream dashboard for webhook data
5. Test mobile responsiveness
6. Test navigation menu
7. Test university switcher

### Test APIs
```bash
# Health check
curl http://localhost:3000/api/health

# Get universities
curl http://localhost:3000/api/universities

# Get specific university
curl http://localhost:3000/api/universities/mit

# Submit lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","program":"Engineering","university":"MIT"}'
```

---

## 📦 Project Structure

```
university-landing-pages/
├── api-backend/
│   ├── server.js           # API server with all endpoints
│   ├── package.json        # Dependencies
│   └── scripts/
├── mit-landing/
│   ├── index.html          # MIT landing page
│   └── script.js           # JS with Pipedream integration
├── delhi-university-landing/
│   ├── index.html          # DU landing page
│   └── script.js           # JS with Pipedream integration
└── README.md               # This file
```

---

## 🔧 Technologies Used

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Integration**: Pipedream (Webhooks, Workflows)
- **Deployment**: Netlify/Vercel (Frontend), Render/Railway (Backend)
- **SSL**: Automatic SSL via hosting platforms

---

## 📝 Environment Variables

Create `.env` file in `api-backend/`:

```env
PORT=3000
NODE_ENV=production
PIPEDREAM_WEBHOOK_URL=your_webhook_url_here
```

---

## 🎯 Checklist - Project Completion

- [x] Two university landing pages (MIT & DU)
- [x] Lead form integration with Pipedream
- [x] Basic APIs with simple JSON
- [x] APIs with nested JSON
- [x] Mobile responsive design
- [x] Desktop responsive design
- [x] Ready for deployment with SSL
- [x] Documentation complete

---

## 🤝 Support

For issues or questions:
1. Check Pipedream workflow logs
2. Check browser console for errors
3. Check API server logs
4. Verify webhook URL is correct

---

## 📄 License

MIT License - Free to use and modify

---

## 🎉 Next Steps

1. ✅ Replace Pipedream webhook URL with your actual URL
2. ✅ Test form submissions end-to-end
3. ✅ Deploy landing pages to Netlify/Vercel
4. ✅ Deploy API backend to Render/Railway
5. ✅ Update API URLs in landing pages if needed
6. ✅ Test on mobile devices
7. ✅ Configure custom domain (optional)
8. ✅ Set up email notifications in Pipedream

---

**Project Status**: ✅ Production Ready

**Last Updated**: November 2025
