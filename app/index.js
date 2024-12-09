const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello" })
})

app.use(cors({
    origin: "http://127.0.0.1:3000"
}));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}!`)
})