import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Modal from '../../components/Modal';

export default function CasesPage() {
  const [dossiers, setDossiers] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCases() {
      setLoading(true);
      try {
        const data = await api.getCases(filterStatus, searchQuery);
        if (isMounted) setDossiers(data);
      } catch (err) {
        console.error('Failed to load dossiers:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timer = setTimeout(loadCases, 150);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [filterStatus, searchQuery]);

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 4. CASE STUDIES SECTION */}
      <section className="px-4 md:px-8 py-space-lg flex flex-col gap-space-md bg-surface max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[16px]">folder_special</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-mono">
                ARCHIVED DOSSIERS
              </span>
            </div>
            <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono uppercase border border-surface-container">
              EDU SIMULATION
            </span>
          </div>

          <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
            Educational Forensic Dossiers
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl">
            Fictional forensic learning scenarios demonstrating standard empirical protocols from scene retrieval to lab confirmation and courtroom presentation.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            {['ALL', 'SOLVED', 'IDENTIFIED', 'NEUTRALIZED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded text-xs font-mono uppercase transition-all ${
                  filterStatus === status
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-2 text-outline text-[16px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search dossier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs rounded bg-surface-container border border-surface-container-high text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Case Study Cards */}
        {loading ? (
          <div className="py-12 flex justify-center items-center text-primary font-mono text-xs gap-2">
            <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
            <span>QUERYING ARCHIVED DOSSIER VAULT...</span>
          </div>
        ) : dossiers.length === 0 ? (
          <div className="py-12 text-center text-on-surface-variant font-mono text-xs">
            NO ARCHIVED DOSSIERS FOUND MATCHING CRITERIA.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md pt-2">
            {dossiers.map((caseItem) => (
              <div
                key={caseItem.id}
                className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm shadow-lg border border-surface-container-high/60 hover:border-primary/40 transition-all hover:shadow-2xl"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span className={`${caseItem.statusColor} font-mono font-semibold`}>
                      {caseItem.tag}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-container">
                      {caseItem.status}
                    </span>
                  </div>

                  <h3
                    className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    {caseItem.title}
                  </h3>

                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {caseItem.summary}
                  </p>

                  <div className="p-2.5 rounded bg-surface-container flex items-center justify-between text-on-surface font-label-sm text-label-sm border border-surface-container-high/40">
                    <span className="text-outline text-xs">Method:</span>
                    <span className={`${caseItem.methodColor} font-mono font-medium text-xs truncate max-w-[200px]`}>
                      {caseItem.method}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCase(caseItem)}
                  className="w-full mt-2 py-2.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1.5 border border-primary/10 hover:border-primary/30"
                >
                  <span>View Case Study</span>
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <Modal
          isOpen={Boolean(selectedCase)}
          onClose={() => setSelectedCase(null)}
          title={selectedCase.title}
          subtitle={`${selectedCase.tag} // ${selectedCase.status}`}
        >
          <div className="space-y-4 text-sm font-body-md">
            <div className="grid grid-cols-2 gap-3 p-3 rounded bg-surface-container text-xs font-mono border border-surface-container-high">
              <div>
                <span className="text-outline block">CLASSIFICATION:</span>
                <span className="text-on-surface">{selectedCase.classification}</span>
              </div>
              <div>
                <span className="text-outline block">JURISDICTION:</span>
                <span className="text-on-surface">{selectedCase.jurisdiction}</span>
              </div>
            </div>

            <div>
              <h4 className="text-primary font-mono text-xs uppercase mb-1 font-semibold">
                Analytical Methodology:
              </h4>
              <p className="text-on-surface bg-surface-container-lowest p-3 rounded font-mono text-xs border border-surface-container-high">
                {selectedCase.method}
              </p>
            </div>

            <div>
              <h4 className="text-primary font-mono text-xs uppercase mb-1 font-semibold">
                Recovered Physical Evidence Items:
              </h4>
              <ul className="space-y-1 text-on-surface-variant text-xs">
                {selectedCase.evidenceItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-mono text-xs uppercase mb-1 font-semibold">
                Investigative Conclusion:
              </h4>
              <p className="text-on-surface leading-relaxed text-xs sm:text-sm bg-surface-container p-3 rounded border border-surface-container-high">
                {selectedCase.fullReport}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
