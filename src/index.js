require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// start server on port 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));