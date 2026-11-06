import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

/**
 * @route   GET /api/capabilities
 * @desc    Get forensic capabilities with category & query filtering
 */
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    let capabilities = db.getCapabilities();

    if (category && category !== 'all') {
      capabilities = capabilities.filter(c => c.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      capabilities = capabilities.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: capabilities.length,
      data: capabilities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forensic capabilities'
    });
  }
});

/**
 * @route   GET /api/capabilities/:id
 * @desc    Get single capability deep-dive specification
 */
router.get('/:id', (req, res) => {
  try {
    const item = db.getCapabilityById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: `Capability '${req.params.id}' not found`
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch capability'
    });
  }
});

export default router;

