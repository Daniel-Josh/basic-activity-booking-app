const { verifyToken } = require("../middleware");
const activityDataModel = require("../db/schema/activitySchema");
const userDataModel = require("../db/schema/userSchema");
const express = require("express");
const router = express.Router();

router.get("/listactivities", async function (req, res) {
    try {
        // Fetch all activities from the database
      const allActivityData = await activityDataModel.find();

      if (!allActivityData || allActivityData.length === 0) {
        return res.status(404).send("No activity data found.");
      }

  console.log("allActivity ----->", allActivityData);
      res.send({ listactivities: allActivityData });
    } catch (error) {
      console.error(
        "error in listactivities API", error.message
      );
      res.status(500).send(error.message);
    }
  });

  router.patch("/bookactivity", verifyToken, async function (req, res) {
    try {
        var emailOfUserInPayload = req.emailOfUserInPayload;
        console.log("booking user ---->", emailOfUserInPayload);
        
        var { _id } = req.body;

  // Find the user by email
  const user = await userDataModel.findOne({ email: emailOfUserInPayload });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Add the new activity to the booked_activity array
  user.booked_activity.push(_id);

  // Save the updated user document
  await user.save();
console.log("userdata after activity added", user);

  res.status(200).json({ message: 'Activity added successfully' });

    } catch (error) {
      console.error(
        "error in bookactivity API", error.message
      );
      res.status(500).send(error.message);
    }
  });

  router.get("/listbookedactivities", verifyToken, async function (req, res) {
    try {
        var emailOfUserInPayload = req.emailOfUserInPayload;

  // Find the user and retrieve only the booked_activity field
  const bookedActivites = await userDataModel.findOne({ email: emailOfUserInPayload }).select('booked_activity');

  console.log("All Booked Activities ----->", bookedActivites);

  // Use $in to get full activity documents based on booked activity IDs
  const bookedActivitesData = await activityDataModel.find({_id: { $in: bookedActivites.booked_activity }});

      res.send({ bookedActivities: bookedActivitesData });

    } catch (error) {
      console.error(
        "error in listbookedactivities API", error.message
      );
      res.status(500).send(error.message);
    }
  });

  module.exports = router;