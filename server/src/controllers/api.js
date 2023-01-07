// Dependencies
const db = require('../config/database')

// Models
const Post = db.get().collection('posts');
const Shop = db.get().collection('shops');
const Product = db.get().collection('products');

// Variables global
const limitPost = 15;
const limitProduct = 20;


// Methods
exports.shops = async (req, res, next) => {
    try {
        let shops = await Shop.find({status: { $ne: 2 }}).toArray();

        if(!shops || shops.length < 1){
            return res.send([]);
        }
        
        return res.send(shops);
    } catch (error) {
        console.log("----------error-------------- shops - API");
        console.log(error);
        console.log("----------error-------------- shops - API");
        return res.send([]);
    }
}

exports.posts = async (req, res, next) => {
    try {
        console.log("----------req.query-------------- posts - API");
        console.log(req.query);
        console.log("----------req.query-------------- posts - API");

        let query = { status: { $ne: 2 } }, sort = {};
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let skip = (page - 1)*limitPost;
        if(req.query.oid && req.query.oid != '' && req.query.oid != 'tong-hop'){
            query.offer_id = req.query.oid.trim();
        }

        if(req.query.s && req.query.s != '' && req.query.s != 'tin-khuyen-mai'){
            // let regex = new RegExp(req.query.s, 'gi');
            // query.$or = [
            //     { title: { $regex: regex } },
            //     { offer_id: { $regex: regex } }
            // ];
            query.$text = { $search: req.query.s }
        }

        if(req.query.type && req.query.type !== ''){
            switch(req.query.type){
                case 'hot': query.started_date = { $gte: (Date.now() - 7*24*60*60*1000)/1000 }; 
                sort.started_date = -1; break;
                case 'coupon': query.coupon_code = { $exists: true, $ne: '' }; break;
            }
        }

        console.log("----------query-------------- posts - API");
        console.log(query);
        console.log("----------query-------------- posts - API");

        sort.order = -1;
        sort.expired_date = 1;
        
        let [count, posts] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query, { sort: sort, skip: skip, limit: limitPost }).toArray()
        ]);

        let totalPage = count > 0 ? Math.ceil(count/limitPost) : 1;
        let data = posts ? posts : [];

        return res.send({ page: page, totalPage: totalPage, data: data });
        
    } catch (error) {
        console.log("----------error-------------- posts - API");
        console.log(error);
        console.log("----------error-------------- posts - API");
        return res.send({page: 1, totalPage: 1, data: []});
    }
}

exports.products = async (req, res, next) => {
    try {
        console.log("----------req.query-------------- products - API");
        console.log(req.query);
        console.log("----------req.query-------------- products - API");

        let query = { status: { $ne: 2 } }, sort = {};
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let skip = (page - 1)*limitProduct;
        if(req.query.oid && req.query.oid != '' && req.query.oid != 'tong-hop'){
            query.advertiser_id = req.query.oid.trim();
        }

        if(req.query.s && req.query.s != '' && req.query.s != 'san-pham'){
            query.$text = { $search: req.query.s }
        }

        // if(req.query.type && req.query.type !== ''){
        //     switch(req.query.type){
        //         case 'hot': query.started_date = { $gte: (Date.now() - 7*24*60*60*1000)/1000 }; 
        //         sort.started_date = -1; break;
        //         case 'coupon': query.coupon_code = { $exists: true, $ne: '' }; break;
        //     }
        // }

        console.log("----------query-------------- products - API");
        console.log(query);
        console.log("----------query-------------- products - API");

        sort.product_discounted_percentage = -1;
        
        let [count, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query, { sort: sort, skip: skip, limit: limitProduct }).toArray()
        ]);

        let totalPage = count > 0 ? Math.ceil(count/limitProduct) : 1;
        let data = products ? products : [];

        return res.send({ page: page, totalPage: totalPage, data: data });
        
    } catch (error) {
        console.log("----------error-------------- products - API");
        console.log(error);
        console.log("----------error-------------- products - API");
        return res.send({page: 1, totalPage: 1, data: []});
    }
}