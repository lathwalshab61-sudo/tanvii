import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import Modal from '../../components/Modal';

export default function MatrixPage() {
  const [capabilities, setCapabilities] = useState([]);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCapabilities() {
      setLoading(true);
      try {
        const data = await api.getCapabilities(selectedCategory, searchQuery);
        if (isMounted) setCapabilities(data);
      } catch (err) {
        console.error('Failed to load capabilities:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timer = setTimeout(loadCapabilities, 150);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 3. SERVICES SECTION */}
      <section className="px-4 md:px-8 py-space-lg flex flex-col gap-space-md bg-surface-container-lowest max-w-7xl mx-auto w-full">
        {/* Header Title */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-tertiary">
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-mono">
              DISCIPLINES & PROTOCOLS
            </span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
            Forensic Investigation Capabilities
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl">
            Analytical instrumentation deployed across judicial, defense, and civilian inquiry environments. Certified under strict ISO/IEC 17025 protocols.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'chemical', label: 'Chemical & Toxic' },
              { id: 'biological', label: 'Biometrics & DNA' },
              { id: 'physical', label: 'Physical & Cyber' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(0,210,255,0.3)]'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search code or discipline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded bg-surface-container border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* 6 Interactive Cards Grid */}
        {loading ? (
          <div className="py-12 flex justify-center items-center text-primary font-mono text-xs gap-2">
            <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
            <span>SYNCHRONIZING DISCIPLINE MATRIX...</span>
          </div>
        ) : capabilities.length === 0 ? (
          <div className="py-12 text-center text-on-surface-variant font-mono text-xs">
            NO FORENSIC PROTOCOLS MATCH THE QUERY SPECIFIED.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm pt-2">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                onClick={() => setSelectedCapability(cap)}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col justify-between gap-space-xs shadow-md border border-surface-container-high/60 cursor-pointer group hover:border-primary/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-lg ${cap.iconBg} flex items-center justify-center ${cap.iconColor} group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-[20px]">{cap.icon}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                        {cap.title}
                      </h3>
                    </div>
                    <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded ${cap.badgeBg} ${cap.badgeText} font-mono font-medium`}>
                      {cap.code}
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 leading-relaxed">
                    {cap.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-container-high/40 flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-primary hover:text-on-surface font-label-md text-label-md font-semibold"
                  >
                    <span>Learn More</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <span className="text-[10px] font-mono text-outline">{cap.standards.split('/')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Capability Deep-Dive Modal */}
      {selectedCapability && (
        <Modal
          isOpen={Boolean(selectedCapability)}
          onClose={() => setSelectedCapability(null)}
          title={selectedCapability.title}
          subtitle={`PROTOCOL: ${selectedCapability.code}`}
        >
          <div className="space-y-4">
            <p className="text-on-surface leading-relaxed text-sm md:text-base">
              {selectedCapability.details}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-surface-container border border-surface-container-high">
                <span className="text-outline block mb-1">LEAD SPECIALIST:</span>
                <span className="text-on-surface font-semibold">{selectedCapability.leadScientist}</span>
              </div>
              <div className="p-3 rounded bg-surface-container border border-surface-container-high">
                <span className="text-outline block mb-1">STANDARD TURNAROUND:</span>
                <span className="text-tertiary font-semibold">{selectedCapability.turnaroundTime}</span>
              </div>
              <div className="p-3 rounded bg-surface-container border border-surface-container-high sm:col-span-2">
                <span className="text-outline block mb-1">ACCREDITATION & REGULATORY STANDARD:</span>
                <span className="text-primary font-semibold">{selectedCapability.standards}</span>
              </div>
            </div>

            <div className="p-3 rounded bg-surface-container-lowest border border-surface-container-high/60 flex items-center justify-between">
              <span className="text-xs text-on-surface-variant">
                Need to submit exhibits for {selectedCapability.title}?
              </span>
              <Link
                to="/ops"
                className="px-3 py-1.5 rounded bg-primary-container text-on-primary-container text-xs font-semibold hover:brightness-110 transition-all"
              >
                Dispatch Evidence
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
