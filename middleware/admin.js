const auth = (req, res, next) => {
  // auth middleware should be called before this
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = auth; 