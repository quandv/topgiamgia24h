// Dependencies
const db = require('../../config/database')
const axios = require('axios')
const _ = require('lodash')

// Models
const Post = db.get().collection('posts');
const Shop = db.get().collection('shops');
const Product = db.get().collection('products');

// Variables global

// Methods
exports.isAdmin = (req, res, next) => {
    return next();
}

exports.index = (req, res) => {
    res.render('backend/index')
}

// TEST 
(async function(){
    // let totalProducts = await axios.get('https://api.ecotrackings.com/api/v3/products?token=fKsNeNzISENlChYmgeGIY&currency=VND&limit=1');
    // if(!totalProducts || !totalProducts.data || !totalProducts.data.meta || !totalProducts.data.meta.total){
    //     console.log('------- Products empty ------- ');
    //     return;
    // }
    // const total = totalProducts.data.meta.total;
    // let limit = 100, page = 730, totalPage = Math.ceil(total/limit);
    
    // (function next() {
    //     page++;
    //     let skip = (page - 1) * limit;

    //     console.log(' ---------- page ===== '+page+' ---------- ');
        
       
    //     if (page > totalPage) { return; } // stop for
        
    //     setTimeout(function(){
    //         let url = 'https://api.ecotrackings.com/api/v3/products?token=fKsNeNzISENlChYmgeGIY&currency=VND&limit='+limit+'&skip='+skip;
    //         // console.log('============url============= Get list product === i =>> ' + i);
    //         // console.log(url);
    //         // console.log('============url============= Get list product === i =>> ' + i);
    //         axios.get(url).then(async function (response) {
    //             // console.log('============response.data============= Get list product');
    //             // console.log(response.data);
    //             // console.log('============response.data============= Get list product');
                
    //             let products = response.data.data;
    //             if(products.length <= 0) { return next() }
    
    //             try {
    //                 // Check product exists
    //                 let postsCurrent = await Product.find({}, { projection: { _id: 0, product_id: 1 } }).toArray();
    //                 let productCurrent = (postsCurrent && postsCurrent.length) ? postsCurrent : [];
                    
    //                 let productNew = _.differenceBy(products, productCurrent, 'product_id');
    //                 let productNewLength = productNew.length;

    //                 console.log('============ Update products ============= Get list product');
    //                 console.log('Add new: ' + productNewLength);
    //                 console.log('============ Update products ============= Get list product');
                    
    //                 if(productNewLength){ // Insert new products of shop
    //                     for(let i = 0; i < productNewLength; i++){
    //                         productNew[i].status = productNew[i].product_discounted_percentage > 0 ? 1 : 2;
    //                     }
    //                     let insertProduct = await Product.insertMany(productNew);
    //                 }

    //                 return next()
    //             } catch (error) {
    //                 console.log('============error============= Get list product');
    //                 console.log(error);
    //                 console.log('============error============= Get list product');
    //                 return next()
    //             }
                
    //         }).catch(error => {
    //             console.log(error.response)
    //             return next()
    //         });
    //     }, 2000)
    // })();
})()

// END TEST

var CronJob = require('cron').CronJob;

// [Mastoffer] Get list promotion
new CronJob('0 */60 * * * *', async function() { // every 60 minutes
    let shop = await Shop.find({}, { projection: { _id: 0, offer_id: 1 } }).toArray();
    if(!shop || shop.length <= 0){ return }
    
    let i = -1;
    (function next() {
        i += 1;
        if (i < 0) { i = 0 };
        console.log("----------ii--------------");
        console.log(i);
        console.log("----------ii--------------");
       
        if (i >= shop.length ) { return; } // stop for
        
        setTimeout(function(){
            let url = 'http://api.masoffer.com/promotions/?offer_id='+shop[i].offer_id+'&coupon=all&take=100';
            // console.log('============url============= Get list promotion === i =>> ' + i);
            // console.log(url);
            // console.log('============url============= Get list promotion === i =>> ' + i);
            axios.get(url).then(async function (response) {
                // console.log('============response.data============= Get list promotion');
                // console.log(response.data);
                // console.log('============response.data============= Get list promotion');
                
                if(response.data.status != 1){ return; }
                let promotions = response.data.data.promotions;
                
                if(promotions.length <= 0) { return next() }
    
                try {
                    // Check promotion exists
                    let postsCurrent = await Post.find({ offer_id: shop[i].offer_id }, { projection: { _id: 0, id: 1 } }).toArray();
                    let promotionCurrent = (postsCurrent && postsCurrent.length) ? postsCurrent : [];                    
                    
                    // promotions = _.map(promotions, (o) => { return o.expired_date != null });
                    let promotionNew = _.differenceBy(promotions, promotionCurrent, 'id');
                    let promotionOld = _.differenceBy(promotionCurrent, promotions, 'id');

                    console.log('============ Update promotions ============= Get list promotion');
                    console.log('Shop: ' + shop[i].offer_id + ' => Add new: ' + promotionNew.length + ' ==== Remove: ' + promotionOld.length);
                    console.log('============ Update promotions ============= Get list promotion');

                    if(promotionOld.length){ // Remove old promotions of shop
                        promotionOld = _.map(promotionOld, (o) => { return o.id });
                        let removePost = await Post.deleteMany({ id: { $in: promotionOld } });
                    }
                    
                    if(promotionNew.length){ // Insert new promotions of shop
                        let insertPost = await Post.insertMany(promotionNew);
                    }

                    return next()
                } catch (error) {
                    console.log('============error============= Get list promotion');
                    console.log(error);
                    console.log('============error============= Get list promotion');
                    return next()
                }
                
            }).catch(error => {
                console.log(error.response)
                return next()
            });
        }, 15000)
    })();
}, null, true, 'Asia/Ho_Chi_Minh');


// [Mastoffer] Get list shop // *Notice: Not get shop by cron job - Admin will get by hand
// new CronJob('00 00 3 * * 0-7', function() { // at 3a.m from monday->sunday

//     axios.get('http://api.masoffer.com/offer/all?pub_id=quandv&token=QeK95a%2Bfw5UoElN18x1UMA%3D%3D')
//     .then(async function (response) {
//         console.log('============response.data============= Get list shop');
//         console.log(response.data);
//         console.log('============response.data============= Get list shop');

//         if(response.data.status != 1){ return; }
//         let data = response.data.data;
        
//         await Shop.deleteMany();

//         let insertShop = await Shop.insertMany(data);

//         console.log('============insertShop============= Get list shop');
//         console.log(insertShop);
//         console.log('============insertShop============= Get list shop');

//     })
// }, null, true, 'Asia/Ho_Chi_Minh');



// [Ecomobi] Get list product discount
// new CronJob('00 00 3 * * 0-7', async function() { // at 3a.m from monday->sunday
//     let totalProducts = await axios.get('https://api.ecotrackings.com/api/v3/products?token=fKsNeNzISENlChYmgeGIY&currency=VND&limit=1');
//     if(!totalProducts || !totalProducts.data || !totalProducts.data.meta || !totalProducts.data.meta.total){
//         console.log('------- Products empty ------- ');
//         return;
//     }
//     const total = totalProducts.data.meta.total;
//     let limit = 100, page = 0, totalPage = Math.ceil(total/limit);
    
//     (function next() {
//         page++;
//         let skip = (page - 1) * limit;

//         console.log(' ---------- page ===== '+page+' ---------- ');
        
       
//         if (page > totalPage) { return; } // stop for
        
//         setTimeout(function(){
//             let url = 'https://api.ecotrackings.com/api/v3/products?token=fKsNeNzISENlChYmgeGIY&currency=VND&limit='+limit+'&skip='+skip;
//             // console.log('============url============= Get list product === i =>> ' + i);
//             // console.log(url);
//             // console.log('============url============= Get list product === i =>> ' + i);
//             axios.get(url).then(async function (response) {
//                 console.log('============response.data============= Get list product');
//                 console.log(response.data);
//                 console.log('============response.data============= Get list product');
                
//                 let products = response.data.data.products;
//                 if(products.length <= 0) { return next() }
    
//                 try {
//                     // Check product exists
//                     let postsCurrent = await Product.find({}, { projection: { _id: 0, product_id: 1 } }).toArray();
//                     let productCurrent = (postsCurrent && postsCurrent.length) ? postsCurrent : [];
                    
//                     let productNew = _.differenceBy(products, productCurrent, 'product_id');
//                     let productNewLength = productNew.length;

//                     console.log('============ Update products ============= Get list product');
//                     console.log('Add new: ' + productNewLength);
//                     console.log('============ Update products ============= Get list product');
                    
//                     if(productNewLength){ // Insert new products of shop
//                         for(let i = 0; i < productNewLength; i++){
//                             productNew[i].status = productNew[i].product_discounted_percentage > 0 ? 1 : 2;
//                         }
//                         let insertProduct = await Product.insertMany(productNew);
//                     }

//                     return next()
//                 } catch (error) {
//                     console.log('============error============= Get list product');
//                     console.log(error);
//                     console.log('============error============= Get list product');
//                     return next()
//                 }
                
//             }).catch(error => {
//                 console.log(error.response)
//                 return next()
//             });
//         }, 20000)
//     })();
// }, null, true, 'Asia/Ho_Chi_Minh');