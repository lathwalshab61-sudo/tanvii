import React, { useState } from 'react';
import { DOCTRINE_CARDS } from '../../data/forensicData';
import Modal from '../../components/Modal';
import ChainOfCustodyTimeline from '../../components/ChainOfCustodyTimeline';
import SpectrogramInspector from '../../components/SpectrogramInspector';

export default function AboutPage() {
  const [selectedDoctrine, setSelectedDoctrine] = useState(null);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 2. ABOUT SECTION */}
      <section className="px-4 md:px-8 py-space-lg flex flex-col gap-space-md bg-surface max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-mono">
              PRINCIPLES OF INQUIRY
            </span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
            The Foundation of Truth
          </h2>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl">
            Established empirical legal methodologies governing physical evidence discovery, preservation, and forensic testimony.
          </p>
        </div>

        {/* Locard / Evidence Axiom Badge */}
        <div className="p-space-md md:p-6 rounded-xl bg-surface-container-high relative overflow-hidden shadow-lg border border-surface-container-highest">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-primary pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">balance</span>
          </div>
          <p className="font-headline-sm md:font-headline-md text-lg md:text-xl italic text-primary-fixed-dim leading-snug max-w-3xl">
            “Physical evidence cannot be intimidated. It does not forget. It cannot lie. It is evidence that does not vanish.”
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm">
            <span className="font-medium text-on-surface">Paul L. Kirk, Criminalistics (1953)</span>
            <span className="text-tertiary font-mono px-2 py-0.5 rounded bg-tertiary/10 border border-tertiary/20">
              LOCARD DOCTRINE OF MUTUAL EXCHANGE
            </span>
          </div>
        </div>

        {/* What is Forensic Science */}
        <div className="p-space-md md:p-6 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-surface-container-high">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
            <h3 className="font-headline-sm text-lg md:text-xl text-on-surface font-semibold">
              What is Forensic Science?
            </h3>
          </div>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            Forensic science is the rigorous application of empirical sciences—chemistry, molecular biology, digital telemetrics, and physics—to resolve legal questions and reconstruct crime sequences with zero subjective bias. By transforming perishable trace exhibits into quantifiable data structures, investigators establish immutable facts that withstand cross-examination.
          </p>
        </div>

        {/* Importance: Comparison Interactive Matrix */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md uppercase text-on-surface-variant tracking-wider font-mono">
              Importance of Scientific Evidence
            </span>
            <span className="text-xs text-outline font-mono">CLICK CARD FOR AUDIT SPECS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DOCTRINE_CARDS.map((card, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDoctrine(card)}
                className="p-space-md rounded-lg bg-surface-container hover:bg-surface-container-high flex flex-col justify-between gap-3 border border-surface-container-high/60 cursor-pointer transition-all hover:scale-[1.01] hover:border-primary/40 group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded ${card.iconBg} shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-headline-sm text-base text-on-surface font-medium truncate">
                        {card.title}
                      </span>
                    </div>
                    <span className={`font-label-sm text-label-sm ${card.badgeColor} px-1.5 py-0.5 rounded bg-surface-container-high font-mono mt-1 self-start`}>
                      {card.badge}
                    </span>
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {card.description}
                </p>

                <span className="text-xs text-primary font-mono flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  Inspect Standard →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Forensic Component: Spectrogram / Waveform Inspector */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md uppercase text-primary tracking-wider font-mono">
              Specialized Instrumentation // Spectrogram & Waveform Inspector
            </span>
            <span className="text-xs text-tertiary font-mono">MULTI-CHANNEL REALTIME TRACE</span>
          </div>
          <SpectrogramInspector channel="SECTOR 04B / CHROMATOGRAPHY ARRAY" sampleName="Exhibit #A-44 Chemical Reconstruction" />
        </div>

        {/* Specialized Forensic Component: Chain-of-Custody Timeline */}
        <div className="p-space-md md:p-6 rounded-xl bg-surface-container-low border border-surface-container-high space-y-4">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm uppercase text-tertiary tracking-wider font-mono">
              EVIDENCE INTEGRITY SEAL
            </span>
            <h3 className="font-headline-sm text-lg md:text-xl font-bold text-on-surface">
              Immutable Chain-of-Custody Timeline
            </h3>
            <p className="text-xs text-on-surface-variant">
              Every specimen is sealed with SHA-256 cryptographic hashes from field retrieval through courtroom testimony.
            </p>
          </div>
          <ChainOfCustodyTimeline />
        </div>

        {/* Role of Forensic Experts Spectrum */}
        <div className="p-space-md md:p-6 rounded-xl bg-surface-container-high flex flex-col gap-space-sm border border-surface-container-highest">
          <span className="font-label-md text-label-md uppercase text-primary tracking-wider font-mono">
            Specialist Operational Spectrum
          </span>
          <p className="text-xs text-on-surface-variant">
            From field recovery to legal confirmation, the forensic process is an unbroken chain of custody.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center font-label-sm text-label-sm text-on-surface-variant mt-2">
            <div className="w-full md:flex-1 p-3 rounded bg-surface-container flex flex-col items-center gap-1.5 border border-surface-container-high">
              <span className="material-symbols-outlined text-primary text-[24px]">camera</span>
              <span className="font-semibold text-on-surface">Crime Scene</span>
              <span className="text-[11px] text-outline font-mono">Documentation, SWGDE capture, sterile recovery</span>
            </div>

            <span className="text-outline text-lg hidden md:block">→</span>
            <span className="text-outline text-lg md:hidden">↓</span>

            <div className="w-full md:flex-1 p-3 rounded bg-surface-container flex flex-col items-center gap-1.5 border border-surface-container-high">
              <span className="material-symbols-outlined text-tertiary text-[24px]">biotech</span>
              <span className="font-semibold text-on-surface">Wet Lab Spectrometry</span>
              <span className="text-[11px] text-outline font-mono">GC-MS, PCR sequencing, ballistic microscopy</span>
            </div>

            <span className="text-outline text-lg hidden md:block">→</span>
            <span className="text-outline text-lg md:hidden">↓</span>

            <div className="w-full md:flex-1 p-3 rounded bg-surface-container flex flex-col items-center gap-1.5 border border-surface-container-high">
              <span className="material-symbols-outlined text-secondary-fixed text-[24px]">gavel</span>
              <span className="font-semibold text-on-surface">Expert Witness</span>
              <span className="text-[11px] text-outline font-mono">Daubert/Frye judicial testimony & peer verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Doctrine Detail Modal */}
      {selectedDoctrine && (
        <Modal
          isOpen={Boolean(selectedDoctrine)}
          onClose={() => setSelectedDoctrine(null)}
          title={selectedDoctrine.title}
          subtitle={`LEGAL AXIOM // ${selectedDoctrine.badge}`}
        >
          <div className="space-y-4 font-body-md text-sm">
            <p className="text-on-surface leading-relaxed text-base">
              {selectedDoctrine.description}
            </p>
            <div className="p-4 rounded-lg bg-surface-container space-y-2 border border-surface-container-high">
              <div className="text-primary font-semibold font-mono text-xs uppercase">
                Admissibility Standard:
              </div>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Adheres strictly to the Federal Rules of Evidence Rule 702 and Daubert standard, requiring empirical testability, peer review, known error rates, and widespread scientific community acceptance.
              </p>
            </div>
            <div className="font-mono text-xs text-outline">
              <div>PROTOCOL REF: FORENSIX-DOC-{selectedDoctrine.badge.replace(/\s+/g, '-')}</div>
              <div>VALIDATION AUTHORITY: FORENSIC SCIENCE BENCHMARK GROUP</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
