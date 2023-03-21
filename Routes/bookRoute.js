const express = require("express");
const router = express.Router();
const Book = require('../Controller/bookController');

router.post('/add', Book.addBook);

router.get('/getall',Book.getAllBooks);

module.exports = router;