// backend/src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ ok: false, msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ ok: false, msg: 'Invalid token payload' });
    }

    // ✅ Set user data for downstream usage
    req.userId = decoded.id;
    req.userRole = decoded.role || 'student';

    next();
  } catch (err) {
    console.error('JWT Verify Error:', err.message);
    return res.status(401).json({ ok: false, msg: 'Invalid or expired token' });
  }
}
