const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
    db.burger.findAll().then((data) => {
        const hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post("/api/new", (req, res) => {
    const newBurger = req.body;
    console.log(newBurger);

    db.burger.create({ name: newBurger.name, devoured: newBurger.devoured }, (result) => {
        res.json({ id: result.insertId })
    })
    .catch((err) => {
        console.log(err);
    });
});

router.put("/api/:id", (req, res) => {
    console.log(req.params.id);
    console.log(parseInt(req.params.id));
    const condition = { where: {id: req.params.id} };
    console.log(req.body.value);
    const update = { devoured:req.body.value};

    db.burger.update(update, condition, (result) => {
        if (result.affectedRows === 0) {
            // If no rows were affected, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    })
    
});

module.exports = router;