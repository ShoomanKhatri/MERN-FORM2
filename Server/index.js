const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(
  cors({
    origin: ["*"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
mongoose.connect(
  "mongodb+srv://shoomankhatri:7RaEFBSU2Hti8cxB@cluster1.zgj3g3g.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // poolSize: 10, // Adjust the pool size as needed
    // minSize: 5, // Minimum number of connections
    // maxSize: 20, // Maximum number of connections
  }
);

app.get("/", async (req, res) => {
  await UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      salary: req.body.salary,
      citizenshipNumber: req.body.citizenshipNumber,
      gender: req.body.gender,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(res))
    .catch((err) => res.json(err));
});
app.post("/createUser", async (req, res) => {
  await UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
