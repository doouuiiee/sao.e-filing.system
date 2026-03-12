// ============================================
// FIREBASE AUTH MIDDLEWARE
// ============================================

const { auth } = require('../config/firebase');
const User = require('../models/User');

const firebaseAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }

    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email;

    // Find user in MongoDB by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found in database' });
    }

    // Attach user info to request
    req.user = user;
    req.userId = user._id;
    req.firebaseUid = firebaseUid;
    
    next();
  } catch (error) {
    console.error('Firebase auth error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-based middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { firebaseAuthMiddleware, requireRole };
