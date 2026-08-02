import { fetchAllSubmissions } from './admin.service.js';

export const getSubmissions = async (req, res, next) => {
  try {
    // Validate admin secret key
    const adminKey = req.headers['x-admin-key'];
    const expectedKey = process.env.ADMIN_SECRET_KEY;

    if (!expectedKey) {
      console.error('❌ ADMIN_SECRET_KEY not configured in environment');
      return res.status(500).json({ message: 'Admin access not configured.' });
    }

    if (!adminKey || adminKey !== expectedKey) {
      return res.status(401).json({ message: 'Unauthorized. Invalid admin key.' });
    }

    const submissions = await fetchAllSubmissions();

    res.status(200).json({
      message: 'Submissions fetched successfully.',
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
};
