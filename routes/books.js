import express from 'express';

import { getBooks, createBook, updateBook, deleteBook, likeBook } from '../controllers/books.js'

const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);

// patch for updating documents
// id is needed in order to update
router.patch('/:id', updateBook);

//need id for identifying which book to delete
router.delete('/:id', deleteBook);

// route for liking
router.patch('/:id/likeBook', likeBook);

export default router;