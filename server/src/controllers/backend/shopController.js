// Dependencies
const db = require('../../config/database')
const axios = require('axios')
const _ = require('lodash')
const multer = require("multer");
const ObjectId = require('mongodb').ObjectId;

// Models
const Post = db.get().collection('posts');
const Shop = db.get().collection('shops');

// Variables global

//Setup multer upload
let storage = multer.diskStorage({
    // Configuring multer to upload towards the public/uploads map
    destination: function(req, file, cb) {
    	cb(null, './public/upload/shop/')
    },
    // Rename the file, so we can create a reference to save in the database.
    filename: function(req, file, cb) {
		var ext = file.originalname.split('.');
        cb(null, ext[0] + '_' + Date.now() + '.' + ext[ext.length - 1]);
    }
});

exports.upload = multer({
	storage: storage,
	//check file extension
	fileFilter: function (req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
		cb(null, true);
	}
}).single('file');

// Methods
exports.index = async (req, res) => {
    try {
        let shops = await Shop.find({}).toArray();

        data = shops && shops.length ? shops : [];

        res.render('backend/shop/index', {
            title: 'Shop | TGG24H',
            data: data
        });
    } catch (error) {
        console.log('--------- error ----------- index - shop ');
        console.log(error);
        console.log('--------- error ----------- index - shop ');
    }
}

exports.create = (req, res) => {
    res.render('backend/shop/create')
}

exports.postCreate = async (req, res) => {
    console.log('--------- req.body ----------- postCreate ');
    console.log(req.body);
    console.log('--------- req.body ----------- postCreate ');

    console.log('--------- req.file ----------- postCreate ');
    console.log(req.file);
    console.log('--------- req.file ----------- postCreate ');

    try {
        let dataInsert = {
            offer_id: req.body.offer_id,
            name: req.body.name,
            domain: req.body.domain,
            aff_url: req.body.aff_url,
            aff_url_short: req.body.aff_url_short,
            about: req.body.about
        }
    
        dataInsert.status = req.body.status ? parseInt(req.body.status) : 2;
    
        dataInsert.avatar = req.file ? '/upload/shop/'+req.file.filename : '';

        let insertShop = await Shop.insertOne(dataInsert);

        console.log('--------- insertShop ----------- postCreate ');
        console.log(insertShop);
        console.log('--------- insertShop ----------- postCreate ');

        return res.send({ status: true, msg: 'Add new shop success!' });
    } catch (error) {
        console.log('--------- error ----------- postCreate ');
        console.log(error);
        console.log('--------- error ----------- postCreate ');
        return res.send({ status: false, msg: 'Add new shop fail!' });
    }
    

    
}

exports.status = async (req, res) => {
    try {
        console.log('--------- req.body ----------- status - shop ');
        console.log(req.body);
        console.log('--------- req.body ----------- status - shop ');

        await Shop.updateOne({ _id: ObjectId(req.body.id) }, { $set: { status: parseInt(req.body.status) } });
        
        return res.send({ status: true, msg: 'Update status of shop success' });
      
    } catch (error) {
        console.log('--------- error ----------- status - shop ');
        console.log(error);
        console.log('--------- error ----------- status - shop ');
        return res.send({ status: true, msg: 'Update status of shop fail' });
    }
}