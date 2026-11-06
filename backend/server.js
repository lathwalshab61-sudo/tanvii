import express from 'express';
import cors from 'cors';
import metricsRoutes from './routes/metricsRoutes.js';
import capabilitiesRoutes from './routes/capabilitiesRoutes.js';
import casesRoutes from './routes/casesRoutes.js';
import intelRoutes from './routes/intelRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import systemRoutes from './routes/systemRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Node-ID']
}));
app.use(express.json());

// Request Telemetry Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Root API Diagnostic
app.get('/', (req, res) => {
  res.json({
    portal: 'FORENSIX Criminalistics Intelligence System',
    version: '2.4.0',
    node: 'ENC_NODE: 709-X',
    status: 'ONLINE',
    endpoints: {
      metrics: '/api/metrics',
      telemetry: '/api/metrics/telemetry',
      capabilities: '/api/capabilities',
      cases: '/api/cases',
      intel: '/api/intel',
      inquiries: '/api/inquiries',
      systemHealth: '/api/system/health'
    }
  });
});

// Mount Routes
app.use('/api/metrics', metricsRoutes);
app.use('/api/capabilities', capabilitiesRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/intel', intelRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/system', systemRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint '${req.originalUrl}' not found on FORENSIX Node 709-X`
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[FORENSIX SERVER ERROR]', err);
  res.status(500).json({
    success: false,
    error: 'Internal criminalistics server telemetry error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║              FORENSIX INVESTIGATION PORTAL // BACKEND            ║
║  Node: ENC_NODE: 709-X  |  Port: ${PORT}                            ║
║  API Base: http://localhost:${PORT}/api                           ║
║  Status: TELEMETRY TRANSMITTER ACTIVE & READY                    ║
╚══════════════════════════════════════════════════════════════════╝
  `);
});

export default app;

