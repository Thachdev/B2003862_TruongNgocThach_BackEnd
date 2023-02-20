const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcom to contact book application"});
});

module.exports = app;