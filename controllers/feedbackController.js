const Feedback = require('../models/Feedback');

// @route POST /api/feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be selected' });
    }
    if (!message || message.trim().length < 5) {
      return res.status(400).json({ message: 'Feedback message cannot be empty and should have a reasonable length' });
    }

    const feedback = await Feedback.create({ name, email, rating, message });
    res.status(201).json({ feedback, message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error submitting feedback', error: err.message });
  }
};

// @route GET /api/feedback
// Supports: search (name/email/message), rating filter, sort by newest/oldest
exports.getFeedback = async (req, res) => {
  try {
    const { search, rating, sort = '-createdAt' } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }
    if (rating) {
      query.rating = Number(rating);
    }

    const feedbackList = await Feedback.find(query).sort(sort);
    res.json({ feedback: feedbackList, total: feedbackList.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching feedback', error: err.message });
  }
};

// @route GET /api/feedback/stats
exports.getStats = async (req, res) => {
  try {
    const total = await Feedback.countDocuments();
    const fiveStar = await Feedback.countDocuments({ rating: 5 });

    const avgResult = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);
    const avgRating = avgResult.length > 0 ? Math.round(avgResult[0].avgRating * 10) / 10 : 0;

    res.json({ total, avgRating, fiveStar });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching stats', error: err.message });
  }
};

// @route GET /api/feedback/:id
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ feedback });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching feedback', error: err.message });
  }
};

// @route DELETE /api/feedback/:id
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting feedback', error: err.message });
  }
};
