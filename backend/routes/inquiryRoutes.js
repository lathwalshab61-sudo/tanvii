import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

/**
 * @route   GET /api/inquiries
 * @desc    Get all submitted inquiries (audit log)
 */
router.get('/', (req, res) => {
  try {
    const inquiries = db.getInquiries();
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inquiries'
    });
  }
});

/**
 * @route   POST /api/inquiries
 * @desc    Submit secure encrypted inquiry / evidence brief
 */
router.post('/', (req, res) => {
  try {
    const { fullName, email, classification, statement } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Full legal name is required'
      });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'A valid institutional email address is required'
      });
    }

    if (!statement || statement.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Statement / brief must be at least 5 characters long'
      });
    }

    const newInquiry = db.createInquiry({
      fullName: fullName.trim(),
      email: email.trim(),
      classification: classification || 'Forensic Case Inquiry',
      statement: statement.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Secure inquiry sealed and transmitted successfully',
      data: newInquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Cryptographic transmission failed'
    });
  }
});

export default router;

