const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const PhotoDao = require("./models/PhotoDao");

const app = express();

mongoose.connect("mongodb://localhost/pcat-test-db");

const port = 3000;

/* uygulamamız için konfigürasyon ayarı. Genelde şablon motoru, ortam değişkenleri,port numarası vs ayarlamak için kullanılır.
 */
app.set("view engine", "ejs");

// belirli bir yol veya tüm yollar için bir middleware ekleme fonksiyonu olan app.use()
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res, next) => {
  const photos = await PhotoDao.find();
  res.status(200).render("index", { photos });
  //.sendFile(path.resolve(__dirname, "temp/index.html"));
});

app.get("/photos/:id", async (req, res) => {
  const photo = await PhotoDao.findById(req.params.id);
  res.render("photos", {
    photo: photo,
  });
});
app.get("/photos/", (req, res) => {
  res.render("photos");
});

app.get("/about", (req, res) => {
  res.status(200).render("about");
});
app.get("/add-photo", (req, res) => {
  res.status(200).render("add-photo");
});
app.post("/photos", async (req, res) => {
  // console.log(req.body);
  await PhotoDao.create(req.body);
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.status(404).send("404 No Pages Found.");
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
