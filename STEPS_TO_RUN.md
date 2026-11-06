# FORENSIX Full-Stack Portal — Guide to Running Together

This guide explains how to start and operate both the **Node.js Express Backend API** (Port 5000) and the **React Vite Frontend SPA** (Port 3000) together.

---

## ⚡ Method 1: One-Click Launchers (Recommended for Windows)

In the root folder (`c:\Users\Welcome\Desktop\t\`), two launcher scripts are pre-configured:

### Option A: Windows Batch Script
Double-click **`run-fullstack.bat`** or run in CMD:
```cmd
.\run-fullstack.bat
```

### Option B: Windows PowerShell Script
Right-click **`run-fullstack.ps1`** and select *Run with PowerShell*, or run:
```powershell
.\run-fullstack.ps1
```

Both scripts automatically:
1. Launch the Backend API server in a dedicated window on `http://localhost:5000`.
2. Wait 2 seconds for the database and telemetry node to initialize.
3. Launch the Vite Frontend development server in a second dedicated window on `http://localhost:3000`.

---

## 💻 Method 2: Manual Two-Terminal Setup

If you prefer to run the services in your own terminals or VS Code tabs:

### Terminal 1: Backend API
```powershell
# Navigate into the backend directory
cd backend

# Start the server with live reload (Node --watch)
npm run dev

# Or start in standard mode:
# npm start
```

*Expected output in Terminal 1:*
```
╔══════════════════════════════════════════════════════════════════╗
║              FORENSIX INVESTIGATION PORTAL // BACKEND            ║
║  Node: ENC_NODE: 709-X  |  Port: 5000                            ║
║  API Base: http://localhost:5000/api                           ║
║  Status: TELEMETRY TRANSMITTER ACTIVE & READY                    ║
╚══════════════════════════════════════════════════════════════════╝
```

---

### Terminal 2: React Frontend
Open a **new terminal tab or window**:
```powershell
# Navigate into the frontend directory
cd frontend

# Start the Vite development server
npm run dev
```

*Expected output in Terminal 2:*
```
  VITE v6.4.5  ready in 320 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://<your-ip>:3000/
  ➜  press h + enter to show help
```

---

## 🌐 URLs & Service Ports

| Service | Local Address | Purpose |
|---|---|---|
| **Frontend Web App** | [`http://localhost:3000`](http://localhost:3000) | Forensic Portal SPA (Hub, Matrix, Cases, Intel, Ops) |
| **Backend API Base** | [`http://localhost:5000/api`](http://localhost:5000/api) | Express REST endpoints |
| **API Health Check** | [`http://localhost:5000/api/system/health`](http://localhost:5000/api/system/health) | Diagnostics, node latency & memory |
| **Live Metrics** | [`http://localhost:5000/api/metrics`](http://localhost:5000/api/metrics) | ISO precision, sample counts |
| **Telemetry Sensor** | [`http://localhost:5000/api/metrics/telemetry`](http://localhost:5000/api/metrics/telemetry) | Live laser & chromatography readings |
| **Evidence Inquiries** | [`http://localhost:5000/api/inquiries`](http://localhost:5000/api/inquiries) | Cryptographically signed submissions |

---

## 🔍 How to Verify Both Are Working

1. **Verify Backend**: Open your browser and navigate to:
   `http://localhost:5000/api/system/health`
   You should see a JSON payload like:
   ```json
   {
     "success": true,
     "node": "ENC_NODE: 709-X",
     "status": "ONLINE",
     "tls": "v1.3",
     "uptime": "14s"
   }
   ```

2. **Verify Frontend**: Open your browser and navigate to:
   `http://localhost:3000`
   - Notice the top header ticker shows a green pulsing dot with `SYS READY` and live latency from the backend node.
   - Click **Ops** in the navigation bar, fill in the secure brief form, and click **Transmit Secure Inquiry**.
   - Check the **Audit Log** drawer: your inquiry is saved and assigned an immutable receipt hash (e.g. `TX-9A8B12C0-TLS13`).

---

## 🛠 Troubleshooting

### Port 5000 or 3000 Already in Use
To free up port 5000 or 3000 on Windows PowerShell:
```powershell
# Find processes on port 5000
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object OwningProcess

# Or kill any lingering node processes:
Stop-Process -Name "node" -Force
```

### Build for Production
To test the production build:
```powershell
cd frontend
npm run build
npm run preview
```
This generates an optimized static bundle in `frontend/dist/`.

