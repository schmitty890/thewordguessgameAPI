import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serving static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(`hi on port ${PORT}`);

  res.send("test route!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
