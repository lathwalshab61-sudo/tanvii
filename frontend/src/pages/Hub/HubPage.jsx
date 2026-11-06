import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import Modal from '../../components/Modal';

export default function HubPage() {
  const [metrics, setMetrics] = useState([]);
  const [telemetry, setTelemetry] = useState({
    calibration: '0.0024 ppm',
    signal: 'SIGNAL STABLE',
    sector: 'SECTOR 04B / CHROMATOGRAPHY ARRAY'
  });
  const [activeMetricModal, setActiveMetricModal] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [metricsData, telemetryData] = await Promise.all([
          api.getMetrics(),
          api.getTelemetry()
        ]);
        if (isMounted) {
          setMetrics(metricsData);
          if (telemetryData) setTelemetry(telemetryData);
        }
      } catch (err) {
        console.warn('Using local fallback for hub data:', err);
      }
    }

    loadData();
    const interval = setInterval(loadData, 10000); // 10s telemetry heartbeat
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 md:px-8 py-space-lg flex flex-col gap-space-lg overflow-hidden bg-surface-container-lowest">
        {/* Ambient glowing telemetry overlay */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-28 w-72 h-72 rounded-full bg-tertiary-container/10 blur-3xl pointer-events-none"></div>

        {/* Lab Hero Backing Canvas with HUD Frame */}
        <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-high shadow-2xl border border-surface-container-high">
          <div
            className="relative h-64 md:h-80 w-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('/hero_lab_screen.png'), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzY6B9DMh-uw2TR9SvPNiGI0iz4saA6qpIyaiZmQE1flDFsEJmuwOixPiHws9bCKRh5ymZL_cpBowq58nFfYqHDlDLmFAxT4wsmCJOBT2mm9rsSrQk7JSvpEN_mSvjhujzgHaW7fvlzbQ0fFKv11XP3MgIvNgdGbfiG9NiBnhL01PiNFuVUH26f3zHgmeHwn6uxfhW6RMa_Gi6DvorvUfBeXPVBly0kpYX1pj7Yj8')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>

            {/* Live HUD Status Marker */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-tertiary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary -ml-3"></span>
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-mono text-[11px]">
                LIVE SCANNING SPECTRA
              </span>
            </div>

            <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-primary/20">
              <span className="font-label-sm text-label-sm text-primary tracking-wider font-mono text-[11px]">
                CALIB: {telemetry.calibration}
              </span>
            </div>

            {/* Lower Inset Telemetry Label */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm font-mono text-[11px] bg-surface-container-lowest/60 backdrop-blur-sm p-2 rounded border border-surface-container-high/40">
              <span className="flex items-center gap-1.5 text-primary-fixed-dim">
                <span className="material-symbols-outlined text-[14px]">biotech</span>
                {telemetry.sector || 'SECTOR 04B / CHROMATOGRAPHY ARRAY'}
              </span>
              <span className="text-tertiary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                {telemetry.signal || 'SIGNAL STABLE'}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col gap-space-sm max-w-4xl">
          <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded bg-surface-container-high text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[16px] text-tertiary">fingerprint</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">
              CRIMINALISTICS TELEMETRY
            </span>
          </div>

          <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface">
            Discover the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-primary to-tertiary">
              Science Behind
            </span>{' '}
            Every Crime.
          </h1>

          <p className="font-body-md text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Uncompromising physical evidence analysis, forensic biometrics, and cutting-edge molecular investigation driving objective judicial truth.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-space-sm w-full max-w-xl">
          <Link
            to="/matrix"
            className="flex-1 flex items-center justify-center gap-2 px-space-md py-3.5 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-secondary-container font-headline-sm text-headline-sm font-semibold shadow-[0_0_20px_rgba(0,210,255,0.35)] hover:brightness-110 active:scale-95 transition-all text-center"
          >
            <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
            <span>Explore Investigations</span>
          </Link>

          <Link
            to="/about"
            className="flex-1 flex items-center justify-center gap-2 px-space-md py-3.5 rounded-lg bg-surface-container-high text-primary hover:text-on-surface hover:bg-surface-container-highest font-headline-sm text-headline-sm font-medium transition-colors border border-surface-container text-center"
          >
            <span className="material-symbols-outlined text-[20px]">science</span>
            <span>Learn More</span>
          </Link>
        </div>

        {/* Live Forensic Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container-high/60 shadow-inner">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              onClick={() => setActiveMetricModal(metric)}
              className="flex flex-col items-center justify-center p-3 rounded bg-surface-container text-center hover:bg-surface-container-high cursor-pointer transition-all border border-surface-container-high/40 hover:border-primary/40 group"
            >
              <span className={`font-label-lg text-2xl font-bold ${metric.color} tracking-tight group-hover:scale-105 transition-transform`}>
                {metric.value}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-1">
                {metric.label}
              </span>
              <span className="text-[10px] text-outline font-mono mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                Click for telemetry
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK COMMAND CENTER TILES */}
      <section className="px-4 md:px-8 py-8 bg-surface border-t border-surface-container">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-tertiary uppercase tracking-widest font-mono">
                TELEMETRY COMMAND
              </span>
              <h2 className="font-headline-md text-2xl font-bold text-on-surface">
                Forensic Modules & Protocols
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/matrix"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-all flex flex-col gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">biotech</span>
              </div>
              <h3 className="font-headline-sm font-semibold text-on-surface">Evidence Matrix</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2">
                6 Core criminalistics disciplines: Toxicology, DNA, Ballistics, and Digital Forensics.
              </p>
              <span className="text-xs text-primary font-mono mt-auto flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Access Matrix →
              </span>
            </Link>

            <Link
              to="/cases"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-all flex flex-col gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">folder_shared</span>
              </div>
              <h3 className="font-headline-sm font-semibold text-on-surface">Case Dossiers</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2">
                Review simulated casefiles: Phantom Vapor, Cold Echo, and Cyber SCADA intrusion.
              </p>
              <span className="text-xs text-tertiary font-mono mt-auto flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Review Dossiers →
              </span>
            </Link>

            <Link
              to="/intel"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-all flex flex-col gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <h3 className="font-headline-sm font-semibold text-on-surface">Scientific Intel</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2">
                Peer-reviewed ISO standards, CRISPR DNA detection, and interactive spectroscopy labs.
              </p>
              <span className="text-xs text-secondary-fixed font-mono mt-auto flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse Repository →
              </span>
            </Link>

            <Link
              to="/ops"
              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-all flex flex-col gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">shield_person</span>
              </div>
              <h3 className="font-headline-sm font-semibold text-on-surface">Secure Ops</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2">
                Encrypted TLS v1.3 direct liaison for lab consortiums and state evidence inquiries.
              </p>
              <span className="text-xs text-primary font-mono mt-auto flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Contact Ops →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Metric Detail Modal */}
      {activeMetricModal && (
        <Modal
          isOpen={Boolean(activeMetricModal)}
          onClose={() => setActiveMetricModal(null)}
          title={activeMetricModal.label}
          subtitle="TELEMETRY VALIDATION"
        >
          <div className="space-y-4 font-body-md">
            <div className="p-4 rounded-lg bg-surface-container flex items-center justify-between border border-surface-container-high">
              <span className="text-outline font-mono">Current Reading:</span>
              <span className={`text-3xl font-bold font-mono ${activeMetricModal.color}`}>
                {activeMetricModal.value}
              </span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              {activeMetricModal.detail}
            </p>
            <div className="p-3 rounded bg-surface-container-lowest font-mono text-xs text-outline space-y-1">
              <div>TELEMETRY NODE: SECTOR-04B-NODE709</div>
              <div>VERIFICATION ALGORITHM: NIST-800-76B</div>
              <div>STATUS: NOMINAL & SYNCHRONIZED</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
