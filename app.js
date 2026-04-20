require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/User.js'); 
const passwordRoutes = require('./routes/passwordRoutes');

const { sequelize } = require('./db');

const app = express();

app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/favicon.ico') {
    console.log(`REQUEST ${req.method} ${req.path}`);
    res.on('finish', () => {
      console.log(`RESPONSE ${req.method} ${req.path} ${res.statusCode}`);
    });
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/expenses', (req, res) => res.sendFile(path.join(__dirname, 'views', 'expense.html')));
app.get('/premium', (req, res) => res.sendFile(path.join(__dirname, 'views', 'premium.html')));

app.use('/api', authRoutes);
app.use('/api', expenseRoutes);
app.use('/api', premiumRoutes);
app.use('/api', paymentRoutes);
app.use('/api', userRoutes);
app.use('/password', passwordRoutes);

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000;

console.log(`Starting server on port ${PORT}`);
console.log(`DB_HOST=${process.env.DB_HOST} DB_PORT=${process.env.DB_PORT} DB_NAME=${process.env.DB_NAME}`);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const syncOptions = process.env.NODE_ENV === 'production' ? {} : { alter: true };
sequelize.sync(syncOptions)
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('DB sync failed:', err);
  });
