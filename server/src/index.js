const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { PORT, MONGO_URI, JWT_KEY } = require("./config/serverConfig");
const authRoute = require("./routes/authRoute");
const overlayRoute = require("./routes/overlayRoute");
const { passportAuth } = require("./config/authPassport");
const app = express();
const httpServer = createServer(app);
const session = require("express-session");
app.set("trust proxy", 1);
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongodb"))
  .catch((err) => {
    console.log("invalid", err);
  });

app.use(
  cors({
    origin: [URL, "http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(
  session({
    secret: `${JWT_KEY}`,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportAuth(passport);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", authRoute);
app.use("/api/overlay", overlayRoute);

app.get("/", (req, res) => {
  res.send("Welcome to server of Talkology");
});

httpServer.listen(PORT, async () => {
  console.log(`Backend runnig on port ${PORT}`);
});

//Socket //

const io = new Server(httpServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
  });

  socket.on("send", () => {
    console.log("got data from frontend");
    socket.emit("get", "nice");
  });
});

// end //
