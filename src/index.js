import env from 'dotenv';
import express from 'express';
import path from 'path';
import rootRouter from './api/root';
import docs from '../docs/index';

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
app.use(docs);

app.all('*', (req, res) => { res.json({ error: '404 Not Found' }); });
// start server on port 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
