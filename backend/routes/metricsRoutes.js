import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

/**
 * @route   GET /api/metrics
 * @desc    Get live forensic operational metrics strip
 */
router.get('/', (req, res) => {
  try {
    const metrics = db.getMetrics();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forensic metrics'
    });
  }
});

/**
 * @route   GET /api/metrics/telemetry
 * @desc    Get live lab telemetry & active sensor readings
 */
router.get('/telemetry', (req, res) => {
  try {
    const telemetry = db.getTelemetry();
    // Simulate slight live fluctuation for real-time fidelity
    const liveCalibration = (0.0024 + (Math.random() * 0.0002 - 0.0001)).toFixed(4) + ' ppm';
    const liveLatency = Math.floor(12 + Math.random() * 6);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        ...telemetry,
        calibration: liveCalibration,
        latencyMs: liveLatency
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch telemetry'
    });
  }
});

export default router;

