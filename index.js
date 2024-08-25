const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default to 3001

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input data. Expected an array of strings.'
    });
  }

  // Separate alphabets and numbers
  const alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item));
  const numbers = data.filter((item) => /^[0-9]+$/.test(item));

  // Find highest lowercase alphabet
  const highestLowercaseAlphabet = alphabets
    .filter((item) => /^[a-z]+$/.test(item))
    .sort()
    .pop() || '';

  // Return the response
  return res.json({
    is_success: true,
    user_id: "john_doe_17091999", // Hardcoded for example, replace with dynamic value if needed
    email: "john@xyz.com", // Hardcoded for example, replace with dynamic value if needed
    roll_number: "ABCD123", // Hardcoded for example, replace with dynamic value if needed
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  });
});

// GET endpoint for /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
