import express from 'express';
import rootRouter from './api/root';
import docs from './docs/index';

const app = express();
const PORT = process.env.PORT || 4000;

// built-in middleware to handle urlencoded form data
app.use(express.json());
// routes
app.use('/', rootRouter);
app.use(docs);

app.all('*', (req, res) => { res.json({ error: '404 Not Found' }); });

// start server on port || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
