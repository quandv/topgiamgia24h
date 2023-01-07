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
    	cb(null, './public/upload/post/')
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
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
		cb(null, true);
	}
}).single('file');

// Methods
exports.index = async (req, res) => {
    try {
        let posts = await Post.find({}).toArray();

        data = posts && posts.length ? posts : [];

        res.render('backend/post/index', {
            title: 'Posts | TGG24H',
            data: data
        });
    } catch (error) {
        console.log('--------- error ----------- index - posts ');
        console.log(error);
        console.log('--------- error ----------- index - posts ');
    }
}

exports.create = (req, res) => {
    res.render('backend/post/create')
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
            title: req.body.title,
            coupon_code: req.body.coupon_code,
            aff_url: req.body.aff_url,
            order: 2,
        }
    
        if(req.body.expired_date_format && req.body.expired_date_format != ''){
            dataInsert.expired_date_format = new Date(req.body.expired_date_format);
            dataInsert.expired_date = dataInsert.expired_date_format.getTime() / 1000;
        }else{
            dataInsert.expired_date_format = new Date('01-01-1970');
            dataInsert.expired_date = null;
        }

        if(req.body.start_date_format && req.body.start_date_format != ''){
            dataInsert.start_date_format = new Date(req.body.start_date_format);
            dataInsert.started_date = dataInsert.start_date_format.getTime() / 1000;
        }
    
        dataInsert.status = req.body.status ? parseInt(req.body.status) : 2;
    
        dataInsert.thumbnail = req.file ? '/upload/post/'+req.file.filename : '';

        let insertPost = await Post.insertOne(dataInsert);

        console.log('--------- insertPost ----------- postCreate ');
        console.log(insertPost);
        console.log('--------- insertPost ----------- postCreate ');

        return res.send({ status: true, msg: 'Add new post success!' });
    } catch (error) {
        console.log('--------- error ----------- postCreate ');
        console.log(error);
        console.log('--------- error ----------- postCreate ');
        return res.send({ status: false, msg: 'Add new post fail!' });
    }
    

    
}

exports.status = async (req, res) => {
    try {
        console.log('--------- req.body ----------- status - post ');
        console.log(req.body);
        console.log('--------- req.body ----------- status - post ');

        await Post.updateOne({ _id: ObjectId(req.body.id) }, { $set: { status: parseInt(req.body.status) } });
        
        return res.send({ status: true, msg: 'Update status of post success' });
      
    } catch (error) {
        console.log('--------- error ----------- status - post ');
        console.log(error);
        console.log('--------- error ----------- status - post ');
        return res.send({ status: true, msg: 'Update status of post fail' });
    }
}

exports.top = async (req, res) => {
    try {
        console.log('--------- req.body ----------- top - post ');
        console.log(req.body);
        console.log('--------- req.body ----------- top - post ');

        await Post.updateOne({ _id: ObjectId(req.body.id) }, { $set: { order: parseInt(req.body.top) } });
        
        return res.send({ top: true, msg: 'Update top of post success' });
      
    } catch (error) {
        console.log('--------- error ----------- top - post ');
        console.log(error);
        console.log('--------- error ----------- top - post ');
        return res.send({ top: true, msg: 'Update top of post fail' });
    }
}