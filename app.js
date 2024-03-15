const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  setTimeout(() => {
    res.status(500).send("Request Timeout");
  }, 3000);
  res.status(200).sendFile(path.resolve(__dirname, "temp/index.html"));
});

app.get("*", (req, res) => {
  res.status(404).send("404 No Pages Found.");
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
