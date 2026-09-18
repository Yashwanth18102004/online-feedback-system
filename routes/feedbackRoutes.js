const express = require('express');
const {
  createFeedback,
  getFeedback,
  getFeedbackById,
  deleteFeedback,
  getStats,
} = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getFeedback);
router.get('/stats', getStats);
router.get('/:id', getFeedbackById);
router.delete('/:id', deleteFeedback);

module.exports = router;
