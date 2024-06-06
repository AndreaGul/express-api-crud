const express = require("express");
const router= express.Router();
const {store, show ,index}= require("../controllers/post");

router.post('/', store);
router.get('/:slug', show);
router.get('/', index);
module.exports= router ;