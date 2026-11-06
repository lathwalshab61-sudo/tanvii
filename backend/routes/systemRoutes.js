import express from 'express';

const router = express.Router();

/**
 * @route   GET /api/system/health
 * @desc    System health, node latency, memory & uptime
 */
router.get('/health', (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());
  const memUsage = process.memoryUsage();

  res.json({
    success: true,
    node: 'ENC_NODE: 709-X',
    status: 'ONLINE',
    tls: 'v1.3',
    uptime: `${uptimeSeconds}s`,
    timestamp: new Date().toISOString(),
    memory: {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`
    }
  });
});

export default router;

