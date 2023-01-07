// Dependencies
const db = require('../../config/database')
const axios = require('axios')

// Models
const Post = db.get().collection('posts');
const Shop = db.get().collection('shops');

// Variables global

// Methods
exports.index = (req, res) => {
    res.render('frontend/index')
}