const express = require('express'); // Import the Express library
const router = express.Router(); // Create a new router object
const Comment = require('../models/Comment'); // Import the Comment model

// Route to add a comment
router.post('/', async (req, res) => {
  // Extract content and author from the request body
  const { content, author } = req.body;

  try {
    // Create a new comment in the database
    await Comment.create({
      content,
      author
    });
    // Redirect to the gigs page after the comment is added
    res.redirect('/gigs');
  } catch (err) {
    // Log the error if there is an issue adding the comment
    console.error('Error adding comment:', err);
    // Send a 500 status code indicating a server error
    res.status(500).send('Server Error');
  }
});

module.exports = router; // Export the router
