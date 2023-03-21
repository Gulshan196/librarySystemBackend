const express = require("express");
const router = express.Router();
const Book = require('../bookController');

router.post('/add', Book.addBook);

module.exports = router;