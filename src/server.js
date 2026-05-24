import express from 'express';

const app = express();
const PORT = 3000;

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});
app.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${id}` });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'Retrieved all notes',
    error: err.message,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
