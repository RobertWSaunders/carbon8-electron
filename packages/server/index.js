require("dotenv").config();

const history = require("connect-history-api-fallback");
const compression = require("compression");
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");

const IS_PROD = process.env.NODE_ENV === "production";
const FORCE_SSL = process.env.FORCE_SSL === "true";

IS_PROD
  ? console.log("Running production server!")
  : console.log("Running development server!");

// Path to static files
const BUNDLE_DIR = path.join(__dirname, "../client/bundle");

const app = express();
const port = process.env.PORT || 3000;

// HTTPS redirect
if (IS_PROD) {
  if (FORCE_SSL) {
    app.enable("trust proxy");
    app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
      }
    });
  }
}

// Third party middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Fallback if required
app.use(history());

// Static files
app.use(express.static(BUNDLE_DIR));

// Start listening!
app.listen(port, () => {
  console.log(`Carbon8 Fountain is running on port ${port}!`);
});
