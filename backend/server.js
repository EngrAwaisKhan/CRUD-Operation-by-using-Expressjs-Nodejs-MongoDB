const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB(); // connect with database(Mongodb)
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/goals', require('./router/goalRouters'));
app.use('/api/users', require('./router/userRouters'));
app.use(errorHandler);
app.listen(port, () => console.log(`server started on port ${port}`));
