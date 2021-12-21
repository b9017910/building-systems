import express from 'express';
import mongoose from 'mongoose';

import BookMessage from '../models/postMessage.js';

export const getBooks = async (req, res) => {
    try {
        const bookMessages = await BookMessage.find();

        console.log(bookMessages);

        res.status(200).json(bookMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {
    const book = req.body;

    const newBook = new BookMessage(book);

    try {
        await newBook.save();

        console.log('Created new book');

        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const updateBook = async (req, res) => {
    const { id: _id } = req.params;

    const book = req.body;

    // checks validity
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No book with that ID');

    // asynchronus action so add await
    // needs { new : true } as a callback for update requests
    const updatedBook = await BookMessage.findByIdAndUpdate(_id, book, { new : true });

    console.log('Updated book');

    res.json(updatedBook);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No book with that ID');

    await BookMessage.findByIdAndRemove(id);

    console.log('Deleted book');

    res.json({ message: 'Book deleted successfully' });
}

export const likeBook = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No book with that ID');

    const book = await BookMessage.findById(id);
    const updatedBook = await BookMessage.findByIdAndUpdate(id, { likeCount: book.likeCount + 1 }, { new : true });
    
    console.log('Liked book');

    res.json(updatedBook)
}