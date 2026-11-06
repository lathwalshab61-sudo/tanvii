import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full px-4 md:px-8 pt-space-lg pb-space-xl flex flex-col gap-space-lg bg-surface-container-lowest border-t border-surface-container-high/40">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-lg">
        {/* Brand Header in Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <img
                alt="FORENSIX Emblem"
                className="w-8 h-8 rounded-sm object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XPsv6lMugJMvqHyty3765Epejc5szTxz11HFCRV3DBdNacN__60MKzUcBvAj37zvipmM82Us0ViR2wUvxgLTp_C3qrFpktsB2DwWcBchNCkJNhg8-kzjCveh155RqGhwQZPI5itfzqxq5OduBH3VGZd8DuA28sss1gWL0ByIdQsi2uLi9_PebfYTg_UNd_YnKb3dS8V8izhWKCIW9Qbz2J67xuzta0r4rbyi2KXsxb"
              />
              <span className="font-headline-md text-headline-md font-bold text-primary tracking-wider">
                FORENSIX
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Forensic Science Research & Criminalistics Analytics Consortium. Scientific precision in uncompromising pursuit of judicial truth.
            </p>
          </div>

          {/* Accreditation Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-primary font-mono border border-surface-container-high">
              ISO/IEC 17025 ACCREDITED
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-tertiary font-mono border border-surface-container-high">
              AAFS AFFILIATED
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-secondary font-mono border border-surface-container-high">
              ENFSI NETWORK
            </span>
          </div>
        </div>

        {/* Quick Navigation Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-surface-container">
          <div className="flex flex-col gap-2 font-label-md text-label-md">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-mono">
              Navigation
            </span>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/">
              Investigation Hub
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/matrix">
              Forensic Matrix
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/cases">
              Case Dossiers
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/intel">
              Scientific Library
            </Link>
          </div>

          <div className="flex flex-col gap-2 font-label-md text-label-md">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-mono">
              Legal & Ethics
            </span>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#chain-of-custody">
              Chain of Custody Policy
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#evidence-seal">
              Evidence Integrity Seal
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#data-privacy">
              Data Privacy Protocols
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#ethics-board">
              Ethics Board Review
            </a>
          </div>

          <div className="flex flex-col gap-2 font-label-md text-label-md">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-mono">
              Standards & Nodes
            </span>
            <span className="text-on-surface-variant text-sm font-mono">NODE: 709-X [ACTIVE]</span>
            <span className="text-on-surface-variant text-sm font-mono">TLS: v1.3 STRICT</span>
            <span className="text-on-surface-variant text-sm font-mono">CALIBRATION: 0.0024 ppm</span>
            <span className="text-tertiary text-sm font-mono">SIGNAL: STABLE</span>
          </div>

          <div className="flex flex-col gap-2 font-label-md text-label-md">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-mono">
              Direct Dispatch
            </span>
            <Link
              to="/ops"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold text-xs transition-colors self-start border border-primary/20"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Open Secure Ops Channel
            </Link>
            <span className="text-outline text-xs mt-1">24/7 Forensic Response Squad</span>
          </div>
        </div>

        {/* Social & Intelligence Connections */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-surface-container gap-4">
          <div className="flex items-center gap-2">
            <a
              title="Forensic Code Source"
              className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
              href="#source"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
            </a>
            <a
              title="Encrypted Share"
              className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
              href="#share"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </a>
            <a
              title="Consortium Repository"
              className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
              href="#library"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
            </a>
            <a
              title="Telemetry RSS Feed"
              className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
              href="#feed"
            >
              <span className="material-symbols-outlined text-[18px]">rss_feed</span>
            </a>
          </div>

          <div className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            <span>ALL LAB NODES SYNCHRONIZED & ACTIVE</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-2 text-center text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container/60">
          © 2025-2026 FORENSIX Scientific Consortium. All rights reserved. Precision in pursuit of truth.
        </div>
      </div>
    </footer>
  );
}

