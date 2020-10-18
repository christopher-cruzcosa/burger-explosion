//dependencies
const express = require("express");
const router = express.Router();
const db = require("../models");

//main page load route
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

//Api route to get save a new burger order to the DB
router.post("/api/new", (req, res) => {
    const newBurger = req.body;
    console.log(newBurger);

    db.burger.create({ name: newBurger.name, devoured: newBurger.devoured }).then((burgerCreate) => {
        console.log("new post");
        const SEE_OTHER_STATUS_CODE = 303;
        return res.end();
    })
    .catch((err) => {
        console.log(err);
    });
});

//Api route to change a selected burger order from notDevoured to devoured
router.put("/api/:id", (req, res) => {
    const condition = { where: {id: req.params.id} };
    const update = { devoured:req.body.value};

    db.burger.update(update, condition).then((burgerChange) => {
        if (burgerChange.affectedRows === 0) {
            return res.status(404).end();
        };
        console.log("new put");
        const SEE_OTHER_STATUS_CODE = 303;
        return res.json(req.params.id).end();
    })
    .catch((err) => {
        console.log(err);
    });
    
});

module.exports = router;