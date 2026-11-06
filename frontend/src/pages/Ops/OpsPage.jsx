import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function OpsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    classification: 'Forensic Case Inquiry',
    statement: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const data = await api.getInquiries();
      setRecentInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTransmitting(true);
    setErrorMsg('');

    try {
      const result = await api.submitInquiry(formData);
      setReceiptData(result);
      setSubmitted(true);
      loadInquiries();
    } catch (err) {
      setErrorMsg(err.message || 'Transmission failed. Verify node status.');
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setReceiptData(null);
    setFormData({
      fullName: '',
      email: '',
      classification: 'Forensic Case Inquiry',
      statement: '',
    });
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 6. CONTACT / OPS SECTION */}
      <section className="px-4 md:px-8 py-space-lg flex flex-col gap-space-md bg-surface max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-mono">
                SECURE LIAISON
              </span>
            </div>
            <button
              onClick={() => setShowLog(!showLog)}
              className="text-xs font-mono text-outline hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">receipt_long</span>
              <span>{showLog ? 'Hide Audit Log' : `Audit Log (${recentInquiries.length})`}</span>
            </button>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
            Connect with Forensic Scientific Liaison
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
            Encrypted communication line for state inquiries, accredited lab partnerships, and legal consultations.
          </p>
        </div>

        {/* Audit Log Drawer if toggled */}
        {showLog && (
          <div className="p-4 rounded-xl bg-surface-container-high border border-surface-container-highest space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-primary font-bold">SEALED INQUIRIES REGISTER</span>
              <span className="text-outline">RECORDS: {recentInquiries.length}</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id || inq.receiptHash}
                  className="p-2.5 rounded bg-surface-container text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1 border border-surface-container-high/60"
                >
                  <div>
                    <span className="text-tertiary font-bold">{inq.receiptHash}</span>
                    <span className="text-on-surface-variant ml-2">{inq.fullName}</span>
                    <span className="text-outline text-[11px] block sm:inline sm:ml-2">({inq.classification})</span>
                  </div>
                  <span className="text-outline text-[10px]">
                    {new Date(inq.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal styled Form Card */}
        <div className="p-space-md md:p-8 rounded-xl bg-surface-container-low shadow-2xl flex flex-col gap-space-md border border-surface-container-high/80">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
            <span className="font-label-sm text-label-sm text-primary font-mono flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              CHANNEL: TLS_v1.3_ENCRYPTED [SHA384]
            </span>
            <span className="text-[11px] font-mono text-outline">ENC_KEY: ACTIVE</span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded bg-error-container/20 text-error border border-error/30 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {submitted && receiptData ? (
            <div className="p-6 rounded-lg bg-surface-container border border-tertiary/40 flex flex-col items-center text-center gap-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">verified_user</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                Transmission Confirmed & Sealed
              </h3>
              <p className="text-xs text-on-surface-variant max-w-md">
                Your forensic brief has been encrypted and routed directly to the duty scientific officer at Central Lab.
              </p>
              <div className="p-3 rounded bg-surface-container-lowest font-mono text-xs text-primary border border-surface-container-high w-full max-w-sm">
                RECEIPT HASH: <span className="text-tertiary font-bold">{receiptData.receiptHash}</span>
              </div>
              <button
                onClick={handleReset}
                className="mt-2 px-4 py-2 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-xs font-semibold"
              >
                Transmit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
              {/* Field 1: Full Name */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase text-xs">
                  Full Legal Name
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                    person
                  </span>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded bg-surface-container text-on-surface placeholder:text-outline text-body-md font-body-md border border-surface-container-high focus:outline-none focus:border-primary focus:bg-surface-container-high transition-colors text-sm"
                    placeholder="Dr. Evelyn Vance"
                    type="text"
                  />
                </div>
              </div>

              {/* Field 2: Email */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase text-xs">
                  Institutional Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                    alternate_email
                  </span>
                  <input
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded bg-surface-container text-on-surface placeholder:text-outline text-body-md font-body-md border border-surface-container-high focus:outline-none focus:border-primary focus:bg-surface-container-high transition-colors text-sm"
                    placeholder="vance@forensix-lab.org"
                    type="email"
                  />
                </div>
              </div>

              {/* Field 3: Inquiry Classification */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase text-xs">
                  Classification Domain
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                    category
                  </span>
                  <select
                    value={formData.classification}
                    onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                    className="w-full pl-10 pr-8 py-2.5 rounded bg-surface-container text-on-surface text-body-md font-body-md border border-surface-container-high focus:outline-none focus:border-primary focus:bg-surface-container-high transition-colors appearance-none text-sm cursor-pointer"
                  >
                    <option>Forensic Case Inquiry</option>
                    <option>Laboratory Consortia Collaboration</option>
                    <option>Academic & Student Research</option>
                    <option>Courtroom Evidence Consultation</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 text-outline text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Field 4: Message */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase text-xs">
                    Statement / Brief
                  </label>
                  <span className="font-label-sm text-label-sm text-outline font-mono text-xs">
                    {formData.statement.length} / 1000
                  </span>
                </div>
                <textarea
                  required
                  maxLength={1000}
                  rows={3}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="w-full p-3 rounded bg-surface-container text-on-surface placeholder:text-outline text-body-md font-body-md border border-surface-container-high focus:outline-none focus:border-primary focus:bg-surface-container-high transition-colors text-sm resize-none"
                  placeholder="Provide evidence markers, jurisdictional references, or analytical parameters..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isTransmitting}
                className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-secondary-container font-headline-sm text-headline-sm font-semibold shadow-[0_0_20px_rgba(0,210,255,0.4)] active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isTransmitting ? 'sync' : 'send'}
                </span>
                <span>{isTransmitting ? 'Encrypting & Routing...' : 'Transmit Secure Inquiry'}</span>
              </button>
            </form>
          )}

          {/* Liaison Quick Telemetry */}
          <div className="pt-3 border-t border-surface-container-high flex flex-col gap-1.5 font-label-sm text-label-sm text-outline font-mono text-xs">
            <div className="flex justify-between items-center">
              <span>SECURE PGP KEY:</span>
              <span className="text-on-surface-variant">4A9F 1120 DE83 99B0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>DIRECT COMMAND LINE:</span>
              <span className="text-tertiary font-bold">+1 (800) 555-CRIME</span>
            </div>
            <div className="flex justify-between items-center">
              <span>CENTRAL LAB LAT/LONG:</span>
              <span className="text-on-surface-variant">38.8977° N, 77.0365° W</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
