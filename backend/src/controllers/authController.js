// backend/src/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const register = async (req, res) => {
  try {
    const { name, email, password, classCompleted } = req.body;
    if (!email || !password) return res.status(400).json({ ok:false, msg:'Email and password required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ ok:false, msg:'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash, classCompleted });
    await user.save();

    // after saving user
const token = jwt.sign({ id: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: '7d' });
res.json({ ok: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, msg:'Server error' });
  }
};


// add inside authController.js
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ ok:false, msg:'Provide email & password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ ok:false, msg:'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ ok:false, msg:'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ ok:true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, msg:'Server error' });
  }
};


export const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ ok:false, msg:'User not found' });
    res.json({ ok:true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, msg:'Server error' });
  }
};
