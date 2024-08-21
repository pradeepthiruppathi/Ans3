const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const adminRoute = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/user-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/admin', adminRoute);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
