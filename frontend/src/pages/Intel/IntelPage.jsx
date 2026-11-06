import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Modal from '../../components/Modal';

export default function IntelPage() {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Publications');
  const [downloadModal, setDownloadModal] = useState(null);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [spectrometerWavelength, setSpectrometerWavelength] = useState(532);
  const [loading, setLoading] = useState(true);

  const categories = ['All Publications', 'Articles', 'Research Papers', 'Student Labs'];

  useEffect(() => {
    let isMounted = true;
    async function loadIntel() {
      setLoading(true);
      try {
        const data = await api.getIntel(activeCategory);
        if (isMounted) setResources(data);
      } catch (err) {
        console.error('Failed to load intel resources:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadIntel();
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const handleAction = (res) => {
    if (res.action === 'launch') {
      setSimulatorOpen(true);
    } else {
      setDownloadModal(res);
    }
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 5. RESOURCES SECTION */}
      <section className="px-4 md:px-8 py-space-lg flex flex-col gap-space-md bg-surface-container-lowest max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[16px]">library_books</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-mono">
              KNOWLEDGE REPOSITORY
            </span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
            Scientific Intelligence
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
            ISO-accredited publications, empirical manuals, validation datasets, and interactive virtual laboratory modules.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(0,210,255,0.3)]'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Grid Cards */}
        {loading ? (
          <div className="py-12 flex justify-center items-center text-primary font-mono text-xs gap-2">
            <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
            <span>INDEXING SCIENTIFIC REPOSITORY...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {resources.map((item) => (
              <div
                key={item.id}
                className="p-space-md rounded-lg bg-surface-container flex items-center justify-between gap-3 border border-surface-container-high/60 hover:border-primary/40 transition-all hover:bg-surface-container-high group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2.5 rounded bg-surface-container-high ${item.iconColor} shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-sm sm:text-base text-on-surface font-medium truncate">
                      {item.title}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs line-clamp-1">
                      {item.description}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction(item)}
                  title={item.action === 'launch' ? 'Launch Simulator' : 'Download Specification'}
                  className="p-2.5 rounded bg-surface-container-high text-primary hover:text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-all shrink-0"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.action === 'launch' ? 'launch' : 'download'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Item 4: Latest Dev Spotlight */}
        <div className="p-space-md md:p-6 rounded-xl bg-surface-container-high flex flex-col gap-2 mt-2 border border-surface-container-highest relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-tertiary uppercase font-mono">
              Q3 TECH UPDATE
            </span>
            <span className="font-label-sm text-label-sm text-outline font-mono px-2 py-0.5 rounded bg-surface-container">
              V2.4 RELEASE
            </span>
          </div>

          <h4 className="font-headline-sm text-base md:text-lg text-on-surface font-semibold">
            Handheld Raman Laser Field Kits Deployed
          </h4>

          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl leading-relaxed">
            New mobile non-destructive analysis tools permit officers and lab field operatives to verify unknown powdery narcotics through sealed glass and plastic containers in under 12 seconds with calibrated 785nm lasers.
          </p>
        </div>
      </section>

      {/* Download Confirmation Modal */}
      {downloadModal && (
        <Modal
          isOpen={Boolean(downloadModal)}
          onClose={() => setDownloadModal(null)}
          title={downloadModal.title}
          subtitle={`INTELLIGENCE ASSET // ${downloadModal.fileSize}`}
        >
          <div className="space-y-4 text-sm font-body-md">
            <p className="text-on-surface leading-relaxed">
              {downloadModal.description}
            </p>
            <div className="p-3 rounded bg-surface-container font-mono text-xs text-outline space-y-1">
              <div>CHECKSUM (SHA-256): 9f8a3c8e1d2f70b4a5c6e8d1...</div>
              <div>CLASSIFICATION: OPEN SCIENTIFIC SPECIFICATION</div>
              <div>FORMAT: ISO/DIS 17025 ELECTRONIC ATTESTATION</div>
            </div>
            <button
              onClick={() => {
                alert(`Downloaded specification: ${downloadModal.title}`);
                setDownloadModal(null);
              }}
              className="w-full py-2.5 rounded bg-gradient-to-r from-primary-container to-secondary-container text-on-secondary-container font-semibold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Confirm & Save Package</span>
            </button>
          </div>
        </Modal>
      )}

      {/* Virtual Spectrometry Lab Simulator Modal */}
      {simulatorOpen && (
        <Modal
          isOpen={simulatorOpen}
          onClose={() => setSimulatorOpen(false)}
          title="Virtual Quadrupole Spectrometer Simulator"
          subtitle="INTERACTIVE LAB SIMULATOR // LEVEL 3"
        >
          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-lg bg-surface-container-lowest border border-surface-container-high space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">LASER EXCITATION WAVELENGTH:</span>
                <span className="text-tertiary font-bold text-sm">{spectrometerWavelength} nm</span>
              </div>
              <input
                type="range"
                min="350"
                max="850"
                value={spectrometerWavelength}
                onChange={(e) => setSpectrometerWavelength(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-outline text-[10px]">
                <span>350nm (UV)</span>
                <span>532nm (Visible Green)</span>
                <span>785nm (Near-IR)</span>
                <span>850nm (IR)</span>
              </div>
            </div>

            {/* Simulated Live Waveform */}
            <div className="p-4 rounded-lg bg-black border border-tertiary/40 relative overflow-hidden h-36 flex flex-col justify-between">
              <div className="flex justify-between text-[10px] text-tertiary">
                <span>INTENSITY (CPS): 4.82e5</span>
                <span>PEAK RESOLUTION: 0.04 m/z</span>
              </div>

              {/* Visual simulated spectral peaks */}
              <div className="flex items-end justify-around h-20 gap-1 px-2 border-b border-surface-container-high">
                <div style={{ height: `${(spectrometerWavelength % 40) + 20}%` }} className="w-2 bg-primary rounded-t transition-all duration-300"></div>
                <div style={{ height: `${(spectrometerWavelength % 60) + 30}%` }} className="w-2 bg-tertiary rounded-t transition-all duration-300"></div>
                <div style={{ height: `${(spectrometerWavelength % 80) + 15}%` }} className="w-2 bg-primary-container rounded-t transition-all duration-300"></div>
                <div style={{ height: `${(spectrometerWavelength % 50) + 40}%` }} className="w-2 bg-secondary rounded-t transition-all duration-300"></div>
                <div style={{ height: `${(spectrometerWavelength % 70) + 25}%` }} className="w-2 bg-tertiary-fixed rounded-t transition-all duration-300"></div>
              </div>

              <div className="flex justify-between text-[10px] text-outline">
                <span>100 m/z</span>
                <span>RETENTION INDICES</span>
                <span>800 m/z</span>
              </div>
            </div>

            <p className="text-on-surface-variant font-sans text-xs">
              Simulator calibrated for quadrupole laser desorption ionization. Adjust excitation wavelength to observe fragment ionization shift.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
