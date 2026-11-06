import React from 'react';
import HubPage from '../Hub/HubPage';
import AboutPage from '../About/AboutPage';
import MatrixPage from '../Matrix/MatrixPage';
import CasesPage from '../Cases/CasesPage';
import IntelPage from '../Intel/IntelPage';
import OpsPage from '../Ops/OpsPage';

export default function PortalPage() {
  return (
    <div className="flex flex-col w-full divide-y divide-surface-container">
      <div id="hub-section">
        <HubPage />
      </div>
      <div id="about-section">
        <AboutPage />
      </div>
      <div id="matrix-section">
        <MatrixPage />
      </div>
      <div id="cases-section">
        <CasesPage />
      </div>
      <div id="intel-section">
        <IntelPage />
      </div>
      <div id="ops-section">
        <OpsPage />
      </div>
    </div>
  );
}

