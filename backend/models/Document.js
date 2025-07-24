  const mongoose = require("mongoose");

  const DocumentSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        default: "",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true // ✅ Adds createdAt and updatedAt
    }
  );

  module.exports = mongoose.model("Document", DocumentSchema);
