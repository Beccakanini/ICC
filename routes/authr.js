app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ msg: 'All fields required' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);

  res.status(200).json({ msg: 'User registered' });
});
