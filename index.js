const express = require("express");

const ejs = require("ejs");

const path = require("path");

const qrcode = require("qrcode");

const app = express();

const port = process.env.port || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const input_text = req.body.text;
  console.log(input_text);
  qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send("something went wrong!");
    res.render("scan", {
      qr_code: src,
    });
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
