const express = require("express");
const router= express.Router();
const {store, show ,index ,update}= require("../controllers/post");

router.post('/', store);
router.get('/:slug', show);
router.get('/', index);
router.post('/:slug', update);
module.exports= router ;