require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes App Backend is running!");
});

require("./schema/Note");
app.use("/api/v1/notes", noteRoutes); //Endpoint

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
