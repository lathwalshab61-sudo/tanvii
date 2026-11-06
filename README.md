# FORENSIX — Full Stack Forensic Investigation Portal

Enterprise full-stack criminalistics and incident telemetry portal converted from Google Stitch design codespace files into a modern **React SPA frontend** and **Express.js REST backend API**.

---

## Architecture Overview

```
t/
├── backend/                              # Node.js + Express REST API Server
│   ├── data/
│   │   ├── db.js                         # File-based database engine & seed controller
│   │   └── forensicDatabase.json         # Persistent JSON database (metrics, cases, inquiries)
│   ├── routes/
│   │   ├── metricsRoutes.js              # GET /api/metrics, GET /api/metrics/telemetry
│   │   ├── capabilitiesRoutes.js         # GET /api/capabilities, GET /api/capabilities/:id
│   │   ├── casesRoutes.js                # GET /api/cases, GET /api/cases/:id
│   │   ├── intelRoutes.js                # GET /api/intel, GET /api/intel/spectrometer
│   │   ├── inquiryRoutes.js              # GET /api/inquiries, POST /api/inquiries (TLS-13 seal)
│   │   └── systemRoutes.js               # GET /api/system/health
│   ├── server.js                         # Express entrypoint, CORS, logger, error handling
│   └── package.json
│
├── frontend/                             # React 18 + Vite + Tailwind CSS SPA
│   ├── public/
│   │   ├── hero_lab_screen.png           # Laboratory background asset
│   │   └── portal_screen.png             # Stitch design preview asset
│   ├── src/
│   │   ├── components/                   # Shared HUD components (Header, BottomNav, Footer, Modal)
│   │   ├── services/
│   │   │   └── api.js                    # API client with automatic offline fallback
│   │   ├── pages/                        # Modular directory for each individual page
│   │   │   ├── Hub/                      # Investigation Hub & Live Telemetry
│   │   │   ├── About/                    # Foundation of Truth & Locard Doctrine
│   │   │   ├── Matrix/                   # 6 Forensic Disciplines & Filter Grid
│   │   │   ├── Cases/                    # Archived Educational Case Dossiers
│   │   │   ├── Intel/                    # Scientific Repository & Virtual Spectrometer
│   │   │   ├── Ops/                      # Encrypted Liaison Form & Audit Register
│   │   │   └── Portal/                   # Unified Consolidated Portal View
│   │   ├── App.jsx                       # Client-side router
│   │   ├── main.jsx                      # Application bootstrap
│   │   └── index.css                     # Design tokens & HUD reticle animations
│   ├── tailwind.config.js                # Exact color palette from Precision Forensic HUD
│   ├── vite.config.js                    # Vite bundler with /api proxy to localhost:5000
│   └── package.json
│
└── stitch_forensix_investigation_portal/ # Original Google Stitch design files & tokens
```

---

## Backend API Specification

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/metrics` | Returns live criminalistics operational metrics |
| `GET` | `/api/metrics/telemetry` | Real-time node status, calibration ppm, and sensor latency |
| `GET` | `/api/capabilities` | List forensic disciplines (supports `?category=` and `?search=`) |
| `GET` | `/api/capabilities/:id` | Single discipline instrumentation and ISO accreditation |
| `GET` | `/api/cases` | List archived dossiers (supports `?status=` and `?search=`) |
| `GET` | `/api/cases/:id` | Detailed casefile report and physical evidence chain |
| `GET` | `/api/intel` | Scientific publications, ISO guidelines, and lab manuals |
| `GET` | `/api/intel/spectrometer` | Laser wavelength simulation & quadrupole peaks |
| `GET` | `/api/inquiries` | Audit log of submitted encrypted evidence inquiries |
| `POST` | `/api/inquiries` | Validates & seals secure inquiry, generating `TX-...-TLS13` hash |
| `GET` | `/api/system/health` | Node uptime, memory usage, and node health |

---

## How to Run

### 1. Start the Backend API (Port 5000)
```powershell
cd backend
npm run dev
# or: npm start
```
*API Base will be accessible at: `http://localhost:5000/api`*

### 2. Start the Frontend Application (Port 3000)
In a separate terminal window:
```powershell
cd frontend
npm run dev
```
*Open your browser at: `http://localhost:3000`*

### 3. Build for Production
```powershell
cd frontend
npm run build
```

