const router = require("express").Router();
const { newProject } = require("../models/newProject");

router.post("/", async (req, res) => {
    try {
        let newProj = await new newProject({ ...req.body }).save();
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;