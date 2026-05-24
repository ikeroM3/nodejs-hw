import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pino());

// Routes
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// Test error route
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Something went wrong',
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
