import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Header({ onMenuClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [telemetry, setTelemetry] = useState({
    status: 'SYS READY',
    nodeId: '709-X',
    latencyMs: 14,
    isOnline: true
  });

  useEffect(() => {
    let isMounted = true;
    async function checkHealth() {
      try {
        const data = await api.getTelemetry();
        if (isMounted) {
          setTelemetry({
            status: data.status || 'SYS READY',
            nodeId: data.nodeId || '709-X',
            latencyMs: data.latencyMs || 14,
            isOnline: true
          });
        }
      } catch (err) {
        if (isMounted) {
          setTelemetry(prev => ({ ...prev, status: 'STANDALONE', isOnline: false }));
        }
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onMenuClick) onMenuClick();
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-surface-container-high/40">
      <div className="max-w-7xl mx-auto h-20 px-4 md:px-6 lg:px-8 flex items-center justify-between gap-space-sm">
        {/* Left: Brand & Mobile Menu */}
        <div className="flex items-center gap-space-sm min-w-0">
          <button
            onClick={toggleMenu}
            aria-label="Navigation Menu"
            className="w-11 h-11 flex items-center justify-center text-primary hover:text-on-surface bg-surface-container-high/60 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <Link to="/" className="flex items-center gap-space-xs group">
            <img
              alt="FORENSIX Emblem"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XPsv6lMugJMvqHyty3765Epejc5szTxz11HFCRV3DBdNacN__60MKzUcBvAj37zvipmM82Us0ViR2wUvxgLTp_C3qrFpktsB2DwWcBchNCkJNhg8-kzjCveh155RqGhwQZPI5itfzqxq5OduBH3VGZd8DuA28sss1gWL0ByIdQsi2uLi9_PebfYTg_UNd_YnKb3dS8V8izhWKCIW9Qbz2J67xuzta0r4rbyi2KXsxb"
            />
            <div className="flex flex-col justify-center leading-none pl-1">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-primary tracking-wider font-bold">
                  FORENSIX
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase text-[10px]">
                CRIME SCIENCE PORTAL
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded font-label-md text-label-md transition-all ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold shadow-inner'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
              }`
            }
          >
            Investigation Hub
          </NavLink>
          <NavLink
            to="/matrix"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded font-label-md text-label-md transition-all ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold shadow-inner'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
              }`
            }
          >
            Evidence Matrix
          </NavLink>
          <NavLink
            to="/cases"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded font-label-md text-label-md transition-all ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold shadow-inner'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
              }`
            }
          >
            Case Dossiers
          </NavLink>
          <NavLink
            to="/intel"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded font-label-md text-label-md transition-all ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold shadow-inner'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
              }`
            }
          >
            Scientific Intel
          </NavLink>
          <NavLink
            to="/ops"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded font-label-md text-label-md transition-all ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold shadow-inner'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
              }`
            }
          >
            Secure Ops
          </NavLink>
        </nav>

        {/* Right: Telemetry pill & Agent Profile */}
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-high/80 rounded border border-surface-container">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${telemetry.isOnline ? 'bg-primary-container' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${telemetry.isOnline ? 'bg-primary-container' : 'bg-amber-400'}`}></span>
            </span>
            <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider font-mono">
              {telemetry.status}
            </span>
          </div>

          <div
            title="Dr. Evelyn Vance - Senior Criminalistics Lead"
            className="relative flex items-center justify-center p-0.5 rounded-full bg-surface-container-high cursor-pointer ring-1 ring-primary/30 hover:ring-primary transition-all"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWmNP1AWYYlQThQifV63g_HcB_PM4UDl_1Aa2JHG-DWScUA4sz8yvTNhi63DCDbFSscATiNO5SLT2feklC1m-pSTwVF9nPWPXARZadqj5Fjg1O0SM6cjaPg5vDyLixZUZOnAkzbBYChelYn3kJeYFGEb79mbQwbSk4MmOVHZTd8yHVpa97Ml1ZGPFOw3unYCsUo-TvVmgLZFhR6SUfUn8b2ffnnAqO7F2qV0N7Wyg"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-tertiary ring-1 ring-surface-dim"></span>
          </div>
        </div>
      </div>

      {/* Sub-header status ticker */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-mono">
            Investigation Hub // Live Node
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-label-sm text-label-sm text-primary-fixed-dim font-mono">
            CHROMA-4B // LATENCY: {telemetry.latencyMs}ms
          </span>
          <span className="font-label-sm text-label-sm text-outline font-mono">
            ENC_NODE: {telemetry.nodeId}
          </span>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest/95 border-b border-surface-container-high px-4 py-4 flex flex-col gap-2 backdrop-blur-2xl">
          <NavLink
            to="/"
            end
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded font-label-md ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold'
                  : 'text-on-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px]">hub</span>
            Investigation Hub
          </NavLink>
          <NavLink
            to="/matrix"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded font-label-md ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold'
                  : 'text-on-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px]">biotech</span>
            Evidence Matrix
          </NavLink>
          <NavLink
            to="/cases"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded font-label-md ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold'
                  : 'text-on-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px]">folder_shared</span>
            Case Dossiers
          </NavLink>
          <NavLink
            to="/intel"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded font-label-md ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold'
                  : 'text-on-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            Scientific Intel
          </NavLink>
          <NavLink
            to="/ops"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded font-label-md ${
                isActive
                  ? 'bg-surface-container-high text-primary-container font-semibold'
                  : 'text-on-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px]">shield_person</span>
            Secure Ops / Contact
          </NavLink>
        </div>
      )}
    </header>
  );
}
