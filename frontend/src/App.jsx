import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';

// Page components modularized into dedicated directories
import HubPage from './pages/Hub';
import AboutPage from './pages/About';
import MatrixPage from './pages/Matrix';
import CasesPage from './pages/Cases';
import IntelPage from './pages/Intel';
import OpsPage from './pages/Ops';
import PortalPage from './pages/Portal';

// Scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
        {/* Persistent Top Navigation Bar */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative w-full pt-28 pb-20 bg-surface">
          <Routes>
            <Route path="/" element={<PortalPage />} />
            <Route path="/hub" element={<HubPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/matrix" element={<MatrixPage />} />
            <Route path="/evidence-matrix" element={<MatrixPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/case-dossiers" element={<CasesPage />} />
            <Route path="/intel" element={<IntelPage />} />
            <Route path="/lab-resources" element={<IntelPage />} />
            <Route path="/ops" element={<OpsPage />} />
            <Route path="/tactical-contact" element={<OpsPage />} />
            <Route path="/contact" element={<OpsPage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="*" element={<PortalPage />} />
          </Routes>
        </main>

        {/* Comprehensive Consortium Footer */}
        <Footer />

        {/* Persistent Mobile Bottom HUD Navigation */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

