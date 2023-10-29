const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRouter = require("./routes/user");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

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

app.get("/", (req, res) => res.send("Hello World!"));

app.use(notFound);
app.use(errorHandler);

(async () => {
  await connectDB();
  app.listen(port, () =>
    console.log(`App running on http://localhost:${port}`)
  );
})();
