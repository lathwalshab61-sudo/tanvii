import React from 'react';

export default function ChainOfCustodyTimeline({ items = [] }) {
  const defaultSteps = [
    {
      stage: 'SCENE RECOVERY',
      operator: 'Det. M. Vance [ID: 8820]',
      time: '03:14 UTC',
      hash: 'SHA256: 7f8a...90c1',
      status: 'VERIFIED SEAL',
      detail: 'Sterile swab & tamper-evident container seal #TE-4991Applied at incident perimeter.'
    },
    {
      stage: 'LAB INGESTION & SECURE CUSTODY',
      operator: 'Dr. E. Vance [Lead Criminalist]',
      time: '05:40 UTC',
      hash: 'SHA256: 9b2d...14a0',
      status: 'CRYPTOGRAPHIC HASH MATCH',
      detail: 'Barcoded accessioning into Sector 04B cold vault at -20°C.'
    },
    {
      stage: 'SPECTROMETRIC EXTRACTION',
      operator: 'Dr. A. Finch, DABFT',
      time: '08:22 UTC',
      hash: 'SHA256: 3c1e...66f8',
      status: 'SPECTRUM CONFIRMED',
      detail: 'Quadrupole tandem GC-MS run #RUN-8812. Solvent peak baseline verified.'
    },
    {
      stage: 'JUDICIAL ATTESTATION',
      operator: 'Forensic Registry Node 709-X',
      time: '11:05 UTC',
      hash: 'SHA256: d84f...a029',
      status: 'LEGAL ADMISSIBILITY LOCK',
      detail: 'Federal Rule 702 & Daubert compliance certified under ISO/IEC 17025.'
    }
  ];

  const timelineSteps = items.length > 0 ? items : defaultSteps;

  return (
    <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary-container before:via-tertiary before:to-primary">
      {timelineSteps.map((step, idx) => (
        <div key={idx} className="relative group">
          {/* Glowing Node Dot */}
          <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-surface-container-lowest border-2 border-primary group-hover:border-tertiary flex items-center justify-center transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-container group-hover:bg-tertiary transition-colors"></div>
          </div>

          {/* Node Content Card */}
          <div className="p-3.5 rounded-lg bg-surface-container border border-surface-container-high hover:border-primary/40 transition-all space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono">
              <span className="text-primary font-bold">{step.stage}</span>
              <span className="text-tertiary px-1.5 py-0.5 rounded bg-tertiary/10 text-[10px] border border-tertiary/20">
                {step.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-outline font-mono">
              <span>{step.operator}</span>
              <span>{step.time}</span>
            </div>

            <p className="text-xs text-on-surface-variant font-sans">
              {step.detail}
            </p>

            <div className="pt-1 text-[10px] font-mono text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-primary">key</span>
              <span>{step.hash}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

