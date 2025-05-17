const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js"); // đường dẫn routes bạn dùng

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ NOT CONNECTED TO NETWORK", err));

// ⚠️ Mount toàn bộ route với prefix '/api'
app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
});
