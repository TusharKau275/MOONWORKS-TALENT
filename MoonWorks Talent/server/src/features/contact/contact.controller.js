import { insertContactSubmission } from './contact.service.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, track_interest, message, source_page } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!track_interest) {
      return res.status(400).json({ message: 'Please select an internship track.' });
    }

    const submission = await insertContactSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      track_interest,
      message: message ? message.trim() : null,
      source_page: source_page || 'contact',
    });

    res.status(201).json({
      message: 'Application submitted successfully!',
      data: { id: submission.id },
    });
  } catch (error) {
    next(error);
  }
};
