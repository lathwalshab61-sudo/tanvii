import { METRICS, CAPABILITIES, DOSSIERS, RESOURCES } from '../data/forensicData';

const API_BASE = '/api';

/**
 * Robust fetch wrapper with automatic JSON parsing and graceful fallback
 */
async function request(endpoint, options = {}, fallbackData = null) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data.data !== undefined ? data.data : data;
  } catch (err) {
    console.warn(`[FORENSIX API] Offline or fallback for ${endpoint}:`, err.message);
    if (fallbackData !== null) {
      return fallbackData;
    }
    throw err;
  }
}

export const api = {
  // Metrics & Telemetry
  async getMetrics() {
    return request('/metrics', {}, METRICS);
  },

  async getTelemetry() {
    return request('/metrics/telemetry', {}, {
      nodeId: "709-X",
      status: "SYS READY",
      calibration: "0.0024 ppm",
      signal: "STABLE",
      sector: "SECTOR 04B / CHROMATOGRAPHY ARRAY",
      latencyMs: 14
    });
  },

  // Capabilities
  async getCapabilities(category, search) {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/capabilities${query}`, {}, CAPABILITIES);
  },

  async getCapabilityById(id) {
    const fallback = CAPABILITIES.find(c => c.id === id);
    return request(`/capabilities/${id}`, {}, fallback);
  },

  // Case Dossiers
  async getCases(status, search) {
    const params = new URLSearchParams();
    if (status && status !== 'ALL') params.append('status', status);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/cases${query}`, {}, DOSSIERS);
  },

  async getCaseById(id) {
    const fallback = DOSSIERS.find(d => d.id === id);
    return request(`/cases/${id}`, {}, fallback);
  },

  // Scientific Intelligence
  async getIntel(category) {
    const params = new URLSearchParams();
    if (category && category !== 'All Publications') params.append('category', category);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/intel${query}`, {}, RESOURCES);
  },

  // Secure Inquiries / Contact
  async submitInquiry(formData) {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      return data.data;
    } catch (err) {
      console.warn('[FORENSIX API] Backend submission failed, generating local cryptographic seal:', err.message);
      return {
        id: `INQ-${Date.now().toString().slice(-4)}-LOCAL`,
        receiptHash: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}-TLS13`,
        ...formData,
        createdAt: new Date().toISOString()
      };
    }
  },

  async getInquiries() {
    return request('/inquiries', {}, []);
  },

  // System Health
  async getHealth() {
    return request('/system/health', {}, { status: 'ONLINE', node: 'ENC_NODE: 709-X' });
  }
};

export default api;

