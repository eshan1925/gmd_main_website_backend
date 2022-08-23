const router = require("express").Router();
const { newProject } = require("../models/newProject");

router.get("/:id",async(req,res)=>{
    try {
        newProject.find({ creatorOfProject: JSON.stringify(req.params.id) }, function (err, foundItems) {
			if (!err) {
				res.status(200).send(foundItems);
			}
		});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"}); 
    }
});

module.exports = router;

