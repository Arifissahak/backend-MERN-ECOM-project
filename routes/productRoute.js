const express = require('express');
const { 
        createProduct, 
        getProduct, 
        getAllProduct, 
        updateProduct, 
        deleteProduct,
        addToWishlist,
        rating,
        uploadImages,
        deleteImages
      } = require('../controller/productctrl');
const { isAdmin, authMidlleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadMiddlewere');
const router = express.Router();

router.get('/', getAllProduct);
router.get('/:id', getProduct);

router.put('/rating', authMidlleware, rating);
router.put('/wishlist', authMidlleware, addToWishlist);
router.put('/upload', authMidlleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages );
router.put('/:id', authMidlleware, isAdmin, updateProduct);

router.post('/', authMidlleware, isAdmin, createProduct);

router.delete('/:id', authMidlleware, isAdmin, deleteProduct);
router.delete('/delete-img/:id', authMidlleware, isAdmin, deleteImages);



module.exports = router;