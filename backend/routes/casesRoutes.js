import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

/**
 * @route   GET /api/cases
 * @desc    Get archived forensic case dossiers with status filtering
 */
router.get('/', (req, res) => {
  try {
    const { status, search } = req.query;
    let cases = db.getCases();

    if (status && status !== 'ALL') {
      cases = cases.filter(c => c.status.toUpperCase().includes(status.toUpperCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      cases = cases.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q) ||
        c.method.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: cases.length,
      data: cases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forensic cases'
    });
  }
});

/**
 * @route   GET /api/cases/:id
 * @desc    Get detailed casefile report & evidence chain
 */
router.get('/:id', (req, res) => {
  try {
    const item = db.getCaseById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: `Case dossier '${req.params.id}' not found`
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch case dossier'
    });
  }
});

export default router;

