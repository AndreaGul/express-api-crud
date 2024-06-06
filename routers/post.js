const express = require("express");
const router= express.Router();
const {store}= require("../controllers/post");

router.post('/', store);

module.exports= router ;