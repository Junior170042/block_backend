const router = require("express").Router();
const Cat = require("../models/categories");

//Add ctegory
router.post('/', async (req, res) => {
    const cat = new Cat(req.body);
    try {
        const savedCat = await cat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(400).json(error);
    }
})

//Get ctegories 
router.get('/', async (req, res) => {
    try {
        const categories = await Cat.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router