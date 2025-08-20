const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const config = require('./config/config');
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Set base URLs in app locals
app.locals.baseUrls = {
  adminPanel: config.adminPanelUrl,
  careerPage: config.careerPageUrl,
  apiBase: config.apiBaseUrl
};

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://urbanchanakya.in",
    "https://urbanchanakya.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/jobs", require("./routes/jobRoutes"));
// Base URL endpoint
app.get('/api/config', (req, res) => {
  res.json({
    success: true,
    data: {
      adminPanelUrl: app.locals.baseUrls.adminPanel,
      careerPageUrl: app.locals.baseUrls.careerPage,
      apiBaseUrl: app.locals.baseUrls.apiBase
    }
  });
});

app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/blog", require('./routes/blogRoutes'));
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


