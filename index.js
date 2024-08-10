const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/UserModel");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://logeshkarthi782:Lw6rqpVd63lrDGmQ@cluster1.pkyc5ip.mongodb.net/crud"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const  id  = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const  id  = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete('/deleteUser/:id' ,(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
})

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
