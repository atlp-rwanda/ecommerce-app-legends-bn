import env from 'dotenv';
import express from 'express';
import path from 'path';
import rootRouter from './api/root';

env.config();

const app = express();
const PORT = process.env.PORT || 4000;

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
// app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', rootRouter);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});
// start server on port 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
