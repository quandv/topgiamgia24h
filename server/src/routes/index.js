var express = require('express')
var router = express.Router()

// Controllers
var adminHomeController = require('../controllers/backend/homeController')
var adminPostController = require('../controllers/backend/postController')
var adminShopController = require('../controllers/backend/shopController')

var userController = require('../controllers/frontend/userController')
var apiController = require('../controllers/api')


// BACKEND
router.get('/admin-topgiamgia24h', adminHomeController.isAdmin, adminHomeController.index)

router.get('/admin-topgiamgia24h/posts/list', adminHomeController.isAdmin, adminPostController.index)
router.get('/admin-topgiamgia24h/posts/create', adminHomeController.isAdmin, adminPostController.create)
router.post('/admin-topgiamgia24h/posts/create', adminHomeController.isAdmin, adminPostController.upload, adminPostController.postCreate)
router.post('/admin-topgiamgia24h/posts/status', adminHomeController.isAdmin, adminPostController.status)
router.post('/admin-topgiamgia24h/posts/top', adminHomeController.isAdmin, adminPostController.top)

router.get('/admin-topgiamgia24h/shop/list', adminHomeController.isAdmin, adminShopController.index)
router.get('/admin-topgiamgia24h/shop/create', adminHomeController.isAdmin, adminShopController.create)
router.post('/admin-topgiamgia24h/shop/create', adminHomeController.isAdmin, adminShopController.upload, adminShopController.postCreate)
router.post('/admin-topgiamgia24h/shop/status', adminHomeController.isAdmin, adminShopController.status)

// FRONTEND
router.get('/', userController.index)
router.get('/khuyen-mai/:oid?/:s?/:page?', userController.index)
router.get('/khuyen-mai-hot/:oid?/:s?/:page?', userController.index)
router.get('/san-pham-khuyen-mai/:oid?/:s?/:page?', userController.index)
router.get('/ma-giam-gia', userController.index)
router.get('/nguon-tin', userController.index)


// API
router.get('/api/posts', apiController.posts)
router.get('/api/shops', apiController.shops)
router.get('/api/products', apiController.products)


module.exports = router