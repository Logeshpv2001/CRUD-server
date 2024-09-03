const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/UserModel");
const UserHistoryModel = require("./models/userHistoryModel");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://logeshkarthi782:PSx2PoiobSvrMMyb@cluster1.pkyc5ip.mongodb.net/crud"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

//Error Handling Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went worng" });
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
  console.log(req.body);
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // get a current user
    const currentUser = await UserModel.findById(id);

    // for a  historical record
    await UserHistoryModel.create({
      userId: id,
      name: currentUser.name,
      address: currentUser.address,
      age: currentUser.age,
      department: currentUser.department,
      employmentStatus: currentUser.employmentStatus,
    });

    // Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        department: req.body.department,
        employmentStatus: req.body.employmentStatus,
      },
      { new: true }
    );
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/userHistory/:id", (req, res) => {
  const id = req.params.id;
  UserHistoryModel.find({ userId: id })
    .then((history) => res.json(history))
    .catch((err) => res.status(500).send(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
