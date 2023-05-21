const express = require("express");

const { connection } = require("./Config/db");
const cors = require("cors");
const { userRouter } = require("./Routes/user.routes");
const authentication = require("./Middlewares/middleware");
const { taskRouter } = require("./Routes/task.routes");

//user login setup
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
// app.use(authentication);
app.use("/tasks", taskRouter);

//demo call
app.get("/", (req, res) => {
  res.send("This is EMT Project");
});

app.listen(5000, async () => {
  try {
    connection;
    console.log("connected with mongodb");
  } catch (e) {
    console.log(e);
  }
  console.log("running on 5000");
});
