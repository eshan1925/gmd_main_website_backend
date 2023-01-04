const router = require("express").Router();
const { User } = require("../models/user");
const { newPortfolioProject } = require("../models/portfolioProject");
const { newPortfolioService } = require("../models/portfolioService");

router.get("/usernamesIntheDB/", async (req, res) => {
  try {
    User.find({}, { username: 1 }, function (err, foundItems) {
      if (!err) {
        const listOfUsernames = [];
        for (var i = 0; i < foundItems.length; i++) {
          if (foundItems[i].username != null)
            listOfUsernames.push(foundItems[i].username);
        }
        res.status(200).send(listOfUsernames);
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/usernamesIntheDB/:id", async (req, res) => {
  console.log(req.body.username);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
      },
    });
    res.status(200).json("Username has been updated");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/mobileNumberIntheDB/:id", async (req, res) => {
  console.log(req.body.number);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        number: req.body.number,
      },
    });
    res.status(200).json("Number has been updated");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/profilePicAndOneLinerIntheDB/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        profilePic: req.body.profilePic,
        oneLiner: req.body.oneLiner,
      },
    });
    res.status(200).json("Profile Pic and one liner has been updated");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/DOB-gender-location/:id", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        dateOfBirth: req.body.data.dateOfBirth,
        gender: req.body.data.gender,
        country: req.body.data.country,
      },
    });
    res.status(200).json("Location,DOB and gender has been updated");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/projects/:id", async (req, res) => {
  try {
    var projectDetail = req.body;
    console.log(projectDetail);
    let newProjectDetailAdd = await new newPortfolioProject({
      ...req.body
    }).save();
    res.status(200).json("New project has been added successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/services/:id", async (req, res) => {
  try {
    var projectService = req.body;
    projectService["creatorOfProject"] = req.params.id;
    console.log(projectService);
    let newServiceDetailAdd = await new newPortfolioService({
      ...req.body,
    }).save();
    res.status(200).json("New service has been added successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    newPortfolioProject.find(
      { creatorOfProject: req.params.id },
      function (err, foundItems) {
        res.status(200).send(foundItems);
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/services/:id", async (req, res) => {
  try {
    newPortfolioService.find(
      { creatorOfService: req.params.id },
      function (err, foundItems) {
        res.status(200).send(foundItems);
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
