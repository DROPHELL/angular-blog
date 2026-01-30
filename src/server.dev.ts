import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env['MONGODB_URI']!)
  .then(() => console.log('MongoDB connected (DEV)'));

app.get('/api/test', (_req, res) => {
  res.json({ ok: true });
});

app.listen(4000, () => {
  console.log('🚀 DEV server running on http://localhost:4000');
});
