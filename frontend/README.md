# FORENSIX — Forensic Science Investigation Portal (React Frontend)

Production-ready React application transformed from Google Stitch codespace designs and design tokens into a modular, componentized frontend.

---

## Architecture & Directory Layout

Each page from the Stitch specification is structured in its own directory under `src/pages/`:

```
frontend/
├── public/
│   ├── hero_lab_screen.png        # Local high-tech laboratory hero asset
│   └── portal_screen.png          # High-resolution full portal design reference
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Top tactical telemetry bar & navigation
│   │   ├── BottomNav.jsx          # Mobile persistent HUD dock (Hub, Matrix, Cases, Intel, Ops)
│   │   ├── Footer.jsx             # Consortium legal, node telemetry & standards footer
│   │   └── Modal.jsx              # Reusable telemetry modal for specs & deep-dives
│   ├── data/
│   │   └── forensicData.js        # Normalized datasets (capabilities, dossiers, metrics, intel)
│   ├── pages/
│   │   ├── Hub/                   # Investigation Hub (Hero, Live HUD, telemetry metrics)
│   │   │   ├── HubPage.jsx
│   │   │   └── index.js
│   │   ├── About/                 # Principles of Inquiry (Locard doctrine, foundation of truth)
│   │   │   ├── AboutPage.jsx
│   │   │   └── index.js
│   │   ├── Matrix/                # Evidence Matrix (6 disciplines: Toxicology, DNA, Ballistics, etc.)
│   │   │   ├── MatrixPage.jsx
│   │   │   └── index.js
│   │   ├── Cases/                 # Case Dossiers (Educational simulations: TRC-8921, GEN-0414, CYB-7703)
│   │   │   ├── CasesPage.jsx
│   │   │   └── index.js
│   │   ├── Intel/                 # Scientific Intelligence (PDF guides, CRISPR papers, Spectrometer sim)
│   │   │   ├── IntelPage.jsx
│   │   │   └── index.js
│   │   ├── Ops/                   # Secure Liaison (Encrypted TLS v1.3 contact terminal & submission)
│   │   │   ├── OpsPage.jsx
│   │   │   └── index.js
│   │   └── Portal/                # Unified consolidated view rendering all sections sequentially
│   │       ├── PortalPage.jsx
│   │       └── index.js
│   ├── App.jsx                    # Router with client-side routing & scroll restitution
│   ├── main.jsx                   # React root entry point
│   └── index.css                  # Tailwind styles + custom HUD reticle animations
├── index.html                     # HTML head loading Space Grotesk, Geist & JetBrains Mono
├── package.json                   # Dependencies: React 18, React Router DOM 6, Tailwind CSS
├── tailwind.config.js             # Exact color tokens from Precision Forensic HUD DESIGN.md
└── vite.config.js                 # Vite bundler configuration
```

---

## Design System Tokens & Alignment

Calibrated directly from `precision_forensic_hud/DESIGN.md`:
- **Canvas Base:** `#090e16` & `#0f141c` (surface obsidian void)
- **Primary Cyber Cyan:** `#00d2ff` & `#a5e7ff` (laser focus & telemetry)
- **Biometric Emerald:** `#00fbaf` & `#00e29d` (positive identification & stable nodes)
- **Typography:**
  - `Space Grotesk` — Engineered headlines & case IDs
  - `Geist` — Clinical body copy & legal summaries
  - `JetBrains Mono` — Spectrometry readouts, timestamps, error rates, and hashes

---

## Available Scripts

In the `frontend` directory:

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

