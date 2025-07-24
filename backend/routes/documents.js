const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const authMiddleware = require("../middleware/auth");

// ✅ Create a new document
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;

    const document = new Document({
      title,
      content: "",
      userId: req.user.id, // 🟢 Matches schema
    });

    await document.save();
    res.status(201).json(document);
  } catch (err) {
    console.error("Error creating document:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all documents created by the logged-in user
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id });
    res.json(documents);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get a document by ID (public for now)
router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  } catch (err) {
    console.error("Error fetching document:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update document (title and/or content)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { content, title } = req.body;
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // 🛡️ Only allow the owner to update
    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // 🔄 Update only fields that are provided
    if (content !== undefined) document.content = content;
    if (title !== undefined) document.title = title;

    await document.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// ✅ Rename a document (only title)
router.patch('/:id/rename', authMiddleware, async (req, res) => {
  try {
    const { newTitle } = req.body;
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // 🛡️ Ensure only the owner can rename
    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    document.title = newTitle;
    await document.save();

    res.json(document);
  } catch (err) {
    console.error("Error renaming document:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find({}, "_id title");
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
