const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, 
  name: { type: String },
  email: { type: String, required: true },
  photoURL: { type: String, default: "" },

  accountType: {
    type: String,
    enum: ["Basic", "Premium"],
    default: "Basic"
  },

  recentlyPlayed: [
    {
    name: String,
    artists: String,
    image: String,
    preview_url: String
    }
  ],

  likedSongs: [{ type: String }],

  playlists: [
    {
      name: String,
      songs: [String],
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
