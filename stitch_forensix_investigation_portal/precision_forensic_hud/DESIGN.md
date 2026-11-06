---
name: Precision Forensic HUD
colors:
  surface: '#0f141c'
  surface-dim: '#0f141c'
  surface-bright: '#343942'
  surface-container-lowest: '#090e16'
  surface-container-low: '#171c24'
  surface-container: '#1b2028'
  surface-container-high: '#252a33'
  surface-container-highest: '#30353e'
  on-surface: '#dee2ee'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dee2ee'
  inverse-on-surface: '#2c3139'
  outline: '#859399'
  outline-variant: '#3c494e'
  surface-tint: '#47d6ff'
  primary: '#a5e7ff'
  on-primary: '#003543'
  primary-container: '#00d2ff'
  on-primary-container: '#00566a'
  inverse-primary: '#00677f'
  secondary: '#aec6ff'
  on-secondary: '#002e6a'
  secondary-container: '#4e8eff'
  on-secondary-container: '#00275d'
  tertiary: '#00fbaf'
  on-tertiary: '#003824'
  tertiary-container: '#00dc99'
  on-tertiary-container: '#005b3d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b6ebff'
  primary-fixed-dim: '#47d6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#aec6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#47ffb8'
  tertiary-fixed-dim: '#00e29d'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f141c'
  on-background: '#dee2ee'
  surface-variant: '#30353e'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies a forensic-grade, tactical scientific aesthetic calibrated for criminalistics, incident response, and biochemical analysis laboratories. It blends cold utilitarian precision with high-tech computational glassmorphism and data-dense intelligence displays.

### Visual Style & Mood
- **Atmospheric High-Tech & Precision:** Anchored in deep optical voids, tactical charcoal slates, and laser-precise luminescence.
- **Instrumental Integrity:** Crisp optical lines, deliberate hierarchy, zero decorative clutter, and information-first telemetry.
- **Emotional Resonance:** Uncompromising authority, clinical accuracy, focus under duress, and state-of-the-art investigative confidence.

## Colors
The palette is calibrated for long sessions in low-light laboratory conditions, maintaining maximum contrast while avoiding visual fatigue.

### Color Archetypes & Tokens
- **Canvas Base (`#07090E`):** Deep obsidian void serving as the global background substrate.
- **Surfaces (`#0F141C`, `#161D29`):** Charcoal slates used for layered panels, analytical tables, and glass card backings.
- **Borders & Crosshairs (`#222F3E`):** Cool metallic alloy lines providing structural boundaries and reticle grids.
- **Electric Cyan Primary (`#00D2FF`):** Focal action triggers, active spectral scans, critical telemetry indicators, and primary selections.
- **Deep Electric Cobalt Secondary (`#0077FE`):** Structural highlights, auxiliary controls, deep telemetry series, and calm verification states.
- **Bioluminescent Green Evidence Accent (`#00FFB2`):** Positive biometric identification, match confirmations, DNA sequence matches, and trace evidence flags.
- **Ice-White Typography (`#F0F6FC` to `#8B9BB4`):** Pure optical clarity for numerical readings, specimen labels, and investigative logs.

## Typography
Typography reflects clinical instrument panels. **Space Grotesk** powers case file titles and situational headers with an assertive, engineered geometry. **Geist** delivers crisp, neutral body copy across analytical summaries, witness depositions, and chain-of-custody documentation. **JetBrains Mono** governs all data grids, timestamps, spectrometer readouts, evidence IDs, and telemetry coordinates.

## Layout & Spacing
The layout follows a rigid 12-column analytical grid on desktop, transitioning to an 8-column layout on tablet and a single-column telemetry stack on mobile. 

- **Grid Rhythms:** Consistent 16px/24px gutters ensure dense yet breathable multi-panel displays (e.g., DNA sequence alongside chronological incident timelines).
- **Safe Zones:** Margins scale fluidly from `1rem` on handheld inspection tablets to `2.5rem` on wide forensic lab command consoles.
- **Micro-metrics:** Component internal padding uses multiples of 4px to maintain uniform metric box alignments and pixel-perfect instrument displays.

## Elevation & Depth
Elevation abandons traditional muddy drop shadows in favor of luminosity layering and precision edge highlights.

- **Level 0 (Canvas Base):** Solid `#07090E` non-reflective floor.
- **Level 1 (Sub-Panels & Data Grids):** `#0F141C` with a 1px border of `#222F3E`.
- **Level 2 (Active Cards & Modals):** Backdrop-filtered slate (`rgba(22, 29, 41, 0.75)` with `backdrop-filter: blur(16px)`), framed with a 1px composite stroke (`#222F3E` on sides, fading to `#00D2FF` at the top active edge).
- **Glow Signatures:** Critical indicators project micro-diffused photon halos (`0 0 16px rgba(0, 210, 255, 0.25)` for active inputs; `0 0 16px rgba(0, 255, 178, 0.35)` for positive evidence matches).

## Shapes
Sharp, controlled, and mechanical. The design system uses minimal rounding (`0.25rem` / `rounded-sm`) to reinforce a surgical, lab-instrument aesthetic. Rounded pills and oversized circular geometries are strictly avoided to ensure dense data modularity and uninterrupted visual scanning planes.

## Components

### Buttons & Interactive Controls
- **Primary Action (Scan / Confirm / Analyze):** Background gradient from `#0077FE` to `#00D2FF`, text `#07090E` in semi-bold `Geist`, crisp 4px corners, and subtle hover glow (`box-shadow: 0 0 12px rgba(0, 210, 255, 0.4)`).
- **Secondary (Inspect / Export / Filter):** Transparent background, 1px `#222F3E` stroke, text `#00D2FF`, transitioning to `#161D29` on hover with a sharpened `#00D2FF` border.
- **Critical / Evidence Marker Action:** Outlined in `#00FFB2` with monospaced uppercase tracking.

### Chips & Evidence Badges
- **Status Chips:** Low-opacity fills (`rgba(0, 255, 178, 0.1)` for verified evidence, `rgba(0, 210, 255, 0.1)` for active processing, `rgba(255, 75, 75, 0.1)` for contaminated/invalid samples).
- **Structure:** Encased in 1px stroke of the accent hue, labeled in `JetBrains Mono` (`label-sm`), featuring a leading 4px pulsing status dot.

### Lists & Data Grids
- **Telemetry Rows:** Alternating faint stripes (`#07090E` and `#0B0F16`) with fine `#161D29` dividers. Hover reveals a left 2px border accent in `#00D2FF`.
- **Numeric Columns:** Right-aligned monospaced typography with tabular figures (`tnum`).

### Input Fields & Search Bars
- **Surface:** `#0F141C` background, 1px border of `#222F3E`, text in `#F0F6FC`.
- **Focus State:** 1px border snaps to `#00D2FF` accompanied by a localized inner and outer cyan telemetry glow.

### Cards & Modular Dossiers
- **Case Dossier Card:** Slate acrylic surface (`#161D29` at 85% opacity, 12px blur), 1px `#222F3E` perimeter border, corner bracket markers (tactile reticle corners), and upper-right timestamp in monospaced ice-white.

### Specialized Forensic Components
- **Chain-of-Custody Timeline:** Vertical glowing rail connecting biometric signature nodes with hash verification chips.
- **Spectrogram / Waveform Inspector:** High-contrast multi-channel graph frame with electric cyan trace lines and bioluminescent green peak flags.