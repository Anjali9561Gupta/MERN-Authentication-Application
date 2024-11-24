const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (payload) => jwt.sign(payload, secret, { expiresIn: '1d' });

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], secret);
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = { generateToken, verifyToken };
