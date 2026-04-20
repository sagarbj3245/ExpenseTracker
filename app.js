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

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});
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

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${PORT}`);
  }
});

const syncOptions = process.env.NODE_ENV === 'production' ? {} : { alter: true };
sequelize.sync(syncOptions)
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Database synced successfully');
    }
  })
  .catch(err => {
    console.error('DB sync failed:', err);
  });
