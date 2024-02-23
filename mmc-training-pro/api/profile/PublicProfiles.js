import express from "express";
import Profiles from "../../models/Profiles.js";
import checkObjectId from "../../middleware/checkObjectId.js";
import getGithubRepositories from "../../services/github.services.js";

const PublicProfileRouter = express.Router();

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
PublicProfileRouter.get("/", async (req, res) => {
  try {
    let profiles = await Profiles.find();
    if (!profiles) {
      return res.status(400).json({ status: false, msg: "Invalid user" });
    }

    return res.status(200).json({ status: true, data: profiles });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, msg: error.message });
  }
});

/*
@method getProfile
 * @param req {Object} Request object
 * @param res {Object} Response object
 * @return {Promise} Promise resolved
 *  @static true    
 * @memberof PublicProfileRouter
 * @alias getProfile
 * @alias get
 * @alias
 * 
*/
PublicProfileRouter.get(
  "/profile/:profile_id",
  checkObjectId("profile_id"),
  async (req, res) => {
    const { profile_id } = req.params;
    try {
      let profile = await Profiles.findById(profile_id);
      if (!profile) {
        return res.status(400).json({ status: false, msg: "Invalid user" });
      }
      return res.status(200).json({ status: true, data: profile });
    } catch (error) {
      return res.status(400).json({ status: false, msg: error.message });
    }
  }
);

PublicProfileRouter.get("/git/:username", async (req, res) => {
  //   console.log("hi");
  const { username } = req.params;
  const result = await getGithubRepositories(username);
  //   return res.status(200).json(result);
  res.json(JSON.stringify(result));
});

export default PublicProfileRouter;
