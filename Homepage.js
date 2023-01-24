const express = require('express');
const bcrypt = require('bcrypt');
const { PlanetScale } = require('planetscale');

const app = express();

app.use(express.urlencoded({ extended: true }));

const db = new PlanetScale();

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/create-account">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <button type="submit">Create Account</button>
    </form>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/create-account', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the username and hashed password in the database
  await db.put({
    table: 'users',
    data: { username, password: hashedPassword }
  });

  res.send('Account created!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user from the database
  const user = await db.get({
    table: 'users',
    where: { username }
  });

  // Compare the provided password with the hashed password in the database
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    res.send('Logged in!');
  } else {
    res.send('Incorrect username or password');
  }
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
