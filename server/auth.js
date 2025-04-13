// server/auth.js
import express from 'express';
import db from './db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, hashedPassword],
    function (err) {
      if (err) return res.status(500).json({ message: 'Email already in use' });
      res.json({ message: 'User registered successfully' });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid credentials' });

    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

    res.json({ message: 'Login successful', name: user.name });
  });
});

export default router;
