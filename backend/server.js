const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http"); // Add this
const { Server } = require("socket.io"); // Add this

const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documents");

// Load .env
dotenv.config();

const app = express();

const server = http.createServer(app); // Wrap Express with HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// WebSocket Events
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  socket.on("get-document", (documentId) => {
    console.log(`📄 Request to open document: ${documentId}`);
    // Here you'd fetch and emit the document contents
  });

  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta); // Basic broadcasting
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// MongoDB + Server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
