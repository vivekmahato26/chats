const express = require("express");
const { json, urlencoded } = require("express");

const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRouter = require('./routes/users');
const auth = require('./middlewares/auth');
const cors = require('cors');
const messageRouter = require("./routes/message");
const fileUpload = require('express-fileupload');

dotenv.config();

mongoose.connect(process.env.MONGODB_STRING);

const app = express();

app.use(cors());

app.use(auth);
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/users", userRouter);
app.use("/messages", messageRouter);
app.listen(5000);