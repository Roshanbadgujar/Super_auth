require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const cors = require('cors')


connectDB();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://127.0.0.1:5500', // Frontend URL you want to allow
  credentials: true, // Allow cookies/auth headers
};

app.use(cors(corsOptions));

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})