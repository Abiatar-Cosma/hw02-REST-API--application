const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
