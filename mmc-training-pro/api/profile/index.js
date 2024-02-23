import express from "express";
import { check, validationResult } from "express-validator";
import Users from "../../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import normalizeUrl from "normalize-url";
import Profiles from "../../models/Profiles.js";

const ProfileRouter = express.Router();

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
ProfileRouter.get("/", async (req, res) => {
  try {
    const profile = await Profiles.findOne({
      user: req.user.id,
    }).populate("user", ["name", "email"]);

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for user" });
    }

    const user = await Users.findById(req.user.id, { name: 1, email: 1 });
    profile.user = user;
    res.json({ ...profile._doc, user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

ProfileRouter.post(
  "/",
  check("status", "status is required").notEmpty(),
  check("status", "status is required").notEmpty(),
  async (req, res) => {
    //console.log(req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
      website,
      skills,
      status,
      ...rest
    } = req.body;
    console.log(rest?.abc);

    const profileFields = {
      user: req.user.id,
      website: website && website != "" ? normalizeUrl(website) : "",
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => " " + s.trim()),
      status: status && status != "" ? status : "",
    };

    const socialFields = { youtube, twitter, facebook, linkedin, instagram };
    Object.entries(socialFields).forEach(([key, value]) => {
      if (value && value.length > 0) {
        socialFields[key] = normalizeUrl(value, { forceHttps: true });
      }
    });

    profileFields.socialFields = socialFields;
    try {
      let profile = await Profiles.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { setDefaultsOnInsert: true, new: true, upsert: true }
      );
      res.status(200).json({ status: true, data: profile });
    } catch (error) {
      res.status(400).json({ status: false, error: error.message });
    }
  }
);


ProfileRouter.put(
  "/exp",
  check("title", "Title is required").notEmpty(),
  check("company", "company is required").notEmpty(),
  // check("from", "from date is required and needs to be from the past")
  //   .notEmpty()
  //   .custom((value, { req }) => {
  //     req.body.to ? value < req.body.to : true;
  //   }),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log("111");
      return res.status(400).json({ status: false, data: errors.message });
    }

    try {
      const profile = await Profiles.findOne({ user: req.user.id });
      profile.experience.unshift(req.body);
      await profile.save();
      return res.status(200).json({ status: true, data: profile });
    } catch (error) {
      return res.status(400).json({ status: false, error: error.message });
    }
  }
);

ProfileRouter.put(
  "/education",
  check("school", "school is required").notEmpty(),
  check("degree", "degree is required").notEmpty(),
  check("fieldofstudy", "fieldofstudy is required").notEmpty(),
  // check("from", "from date is required and needs to be from the past")
  //   .notEmpty()
  //   .custom((value, { req }) => {
  //     req.body.to ? value < req.body.to : true;
  //   }),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log("111");
      return res.status(400).json({ status: false, data: errors.message });
    }

    try {
      const profile = await Profiles.findOne({ user: req.user.id });
      profile.education.unshift(req.body);
      await profile.save();
      return res.status(200).json({ status: true, data: profile });
    } catch (error) {
      return res.status(400).json({ status: false, error: error.message });
    }
  }
);

// delete exprience based on expeprience id
ProfileRouter.delete("/exp/:exp_id", async (req, res) => {
  try {
    const profile = await Profiles.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      (e) => e._id.toString() != req.params.exp_id
    );
    await profile.save();
    res.status(200).json({ status: true, data: profile });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

// delete education based on education id
ProfileRouter.delete("/education/:edu_id", async (req, res) => {
  try {
    const profile = await Profiles.findOne({ user: req.user.id });
    profile.education = profile.education.filter(
      (e) => e._id.toString() != req.params.edu_id
    );
    await profile.save();
    res.status(200).json({ status: true, data: profile });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

export default ProfileRouter;
