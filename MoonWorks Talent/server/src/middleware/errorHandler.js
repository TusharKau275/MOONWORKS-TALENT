export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS: Origin not allowed.' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error.',
  });
};
