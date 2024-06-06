const express = require("express");
const router= express.Router();
const {store,index}= require("../controllers/post");

router.post('/', store);
router.get('/', index);
module.exports= router ;