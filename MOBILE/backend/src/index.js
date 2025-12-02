import "dotenv/config.js";
import express from 'express';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/authroutes.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
