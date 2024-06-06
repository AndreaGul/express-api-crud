const express = require("express");
const router= express.Router();
const {store, show ,index ,update,destroy}= require("../controllers/post");

router.post('/', store);
router.get('/:slug', show);
router.get('/', index);
router.post('/:slug', update);
router.delete('/:slug', destroy);

module.exports= router ;