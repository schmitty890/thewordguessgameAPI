import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import routes from "./src/routes/crmRoutes";
import gameRoutes from "./src/routes/gameRoutes";
import globalDailyGameRoutes from "./src/routes/globalDailyGameRoutes";

const app = express();

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;
// enable cors
app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/thewordguessgameAPI";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) {
          req.user = undefined;
        }
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});
// serving static files
app.use(express.static("public"));

routes(app);
gameRoutes(app);
globalDailyGameRoutes(app);

app.get("/", (req, res) => {
  console.log(`hi on port ${PORT}`);

  res.send("test route!");
});

// setInterval(function () {
//   http.get("http://thewordguessgameapi.herokuapp.com/");
// }, 300000); // every 5 minutes (300000)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
