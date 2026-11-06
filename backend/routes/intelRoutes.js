import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

/**
 * @route   GET /api/intel
 * @desc    Get scientific intelligence repository documents
 */
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let resources = db.getResources();

    if (category && category !== 'All Publications') {
      resources = resources.filter(r => r.category === category);
    }

    res.json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scientific intel repository'
    });
  }
});

/**
 * @route   GET /api/intel/spectrometer
 * @desc    Get virtual spectrometer telemetry simulation profile
 */
router.get('/spectrometer', (req, res) => {
  try {
    const wavelength = Number(req.query.wavelength) || 532;
    res.json({
      success: true,
      wavelength,
      laserBand: wavelength < 400 ? 'Ultraviolet' : wavelength <= 600 ? 'Visible Green' : 'Near-Infrared',
      intensityCps: '4.82e5',
      peakResolutionMz: 0.04,
      peaks: [
        { mz: 142.1, intensity: (wavelength % 40) + 20, element: 'Fragment Alpha' },
        { mz: 218.4, intensity: (wavelength % 60) + 30, element: 'Fragment Beta' },
        { mz: 305.2, intensity: (wavelength % 80) + 15, element: 'Parent Ion' },
        { mz: 412.8, intensity: (wavelength % 50) + 40, element: 'Adduct Complex' }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to simulate spectrometer waveform'
    });
  }
});

export default router;

