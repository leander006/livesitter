const mongoose = require("mongoose");

const OverlaySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
    },
    content: {
      type: String,
    },
    color: {
      type: String,
    },
    left: {
      type: String,
    },
    top: {
      type: String,
    },
  },
  { timestamps: true }
);

const Overlay =
  mongoose.models.Overlay || mongoose.model("Overlay", OverlaySchema);
module.exports = Overlay;
