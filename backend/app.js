const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRouter = require("./routes/user");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const path = require("path");

dotenv.config();
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`URL: ${req.url}, method: ${req.method}`);
  next();
});

app.use("/api", userRouter);

const dirname = path.resolve();

if (process.env.NODE_ENV !== "development") {
  // Static folder
  app.use(express.static(path.join(dirname, "/frontend/dist")));

  // Home page
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.use(notFound);
app.use(errorHandler);

(async () => {
  await connectDB();
  app.listen(port, () =>
    console.log(`App running on http://localhost:${port}`)
  );
})();
