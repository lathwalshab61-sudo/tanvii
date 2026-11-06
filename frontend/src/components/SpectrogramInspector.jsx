import React, { useState, useEffect } from 'react';

export default function SpectrogramInspector({ channel = 'CHROMATOGRAPHY 4B', sampleName = 'Vat Matrix Specimen #A-44' }) {
  const [activePeak, setActivePeak] = useState(null);
  const [channels, setChannels] = useState({
    ch1: true,
    ch2: true,
    ch3: false
  });

  const peaks = [
    { id: 'P-1', mz: 142.1, time: '2.4 min', label: 'Hexyl-Solvent Carrier', intensity: '84%', color: 'text-primary' },
    { id: 'P-2', mz: 218.4, time: '5.8 min', label: 'Organophosphate Isomer', intensity: '98%', color: 'text-tertiary', flagged: true },
    { id: 'P-3', mz: 305.2, time: '9.2 min', label: 'Polymer Hydrolyzate', intensity: '42%', color: 'text-secondary' },
    { id: 'P-4', mz: 412.8, time: '14.1 min', label: 'Heavy Hydrocarbon Residue', intensity: '28%', color: 'text-outline' },
  ];

  return (
    <div className="p-4 md:p-6 rounded-xl bg-surface-container-low border border-surface-container-high shadow-2xl flex flex-col gap-4 font-mono text-xs">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-surface-container-high">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
          <span className="text-primary font-bold">{channel}</span>
          <span className="text-outline">[{sampleName}]</span>
        </div>

        {/* Channel toggles */}
        <div className="flex items-center gap-2">
          <span className="text-outline text-[10px]">TRACE:</span>
          {Object.keys(channels).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannels({ ...channels, [ch]: !channels[ch] })}
              className={`px-2 py-0.5 rounded text-[10px] uppercase transition-all ${
                channels[ch]
                  ? 'bg-primary-container/20 text-primary border border-primary/40 font-bold'
                  : 'bg-surface-container text-outline hover:text-on-surface'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Waveform Canvas Simulation */}
      <div className="relative h-48 w-full bg-black/90 rounded-lg border border-primary/30 p-3 overflow-hidden flex flex-col justify-between">
        {/* Reticle grid background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #00d2ff 1px, transparent 1px), linear-gradient(to bottom, #00d2ff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        ></div>

        {/* Live Calibration Markers */}
        <div className="relative z-10 flex justify-between items-center text-[10px] text-outline">
          <span className="text-tertiary">LIVE ACQUISITION: 10,000 pts/sec</span>
          <span className="text-primary">RESOLUTION: 0.002 ppm</span>
        </div>

        {/* Animated Simulated Traces */}
        <div className="relative z-10 flex items-end justify-between h-28 gap-2 px-2">
          {peaks.map((peak) => (
            <div
              key={peak.id}
              onClick={() => setActivePeak(peak)}
              className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer group"
            >
              {/* Flag Pill for suspicious target */}
              {peak.flagged && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-tertiary text-on-tertiary font-bold mb-1 animate-pulse">
                  FLAGGED
                </span>
              )}
              
              {/* Waveform Bar Peak */}
              <div
                style={{ height: peak.intensity }}
                className={`w-3 sm:w-5 rounded-t transition-all duration-300 ${
                  peak.flagged
                    ? 'bg-gradient-to-t from-tertiary-container via-tertiary to-white shadow-[0_0_12px_rgba(0,251,175,0.7)]'
                    : 'bg-gradient-to-t from-primary-container via-primary to-white group-hover:brightness-125'
                }`}
              ></div>

              <span className="text-[9px] text-outline mt-1 group-hover:text-primary transition-colors">
                {peak.mz}
              </span>
            </div>
          ))}
        </div>

        {/* Time Axis */}
        <div className="relative z-10 flex justify-between items-center text-[10px] text-outline pt-1 border-t border-surface-container-high/60">
          <span>0.0 min</span>
          <span className="text-primary font-bold">RETENTION TIMELINE (UHPLC)</span>
          <span>15.0 min</span>
        </div>
      </div>

      {/* Selected Peak Telemetry Inspector */}
      {activePeak ? (
        <div className="p-3 rounded-lg bg-surface-container border border-tertiary/40 flex items-center justify-between text-xs animate-fade-in">
          <div>
            <span className="text-tertiary font-bold">{activePeak.id}: {activePeak.label}</span>
            <span className="text-outline block text-[11px]">m/z: {activePeak.mz} | Retention: {activePeak.time}</span>
          </div>
          <span className="text-primary font-bold">{activePeak.intensity} Intensity</span>
        </div>
      ) : (
        <div className="text-[11px] text-outline text-center">
          Click any spectral peak above to view quadrupole fragmentation telemetry.
        </div>
      )}
    </div>
  );
}
