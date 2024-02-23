import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldofstudy: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  bio: { type: String },
  githubusername: { type: String },
  experience: { type: [ExperienceSchema] },
  education: { type: [EducationSchema] },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Profiles", ProfileSchema);
