'use strict';

const firebase = require('../db');
const product = require('../models/product');
const firestore = firebase.firestore();

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        await firebase.collection('products').doc().set(data);
        res.send('Saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addProduct
}