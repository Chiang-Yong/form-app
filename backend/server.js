const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//Method 2 - define User outside Server.js
const User = require("./model/User");

const salt = bcrypt.genSaltSync(10);
const secret = "ghz%45ud6a7k42h7ag4g3e$y$5j3jf7dk#2h3k2";
//Server port
const Port = 4000;

//const clientPort = 3000;

//Cross Origin Resource Sharing to allow sharing other domain, scheme, port resources
app.use(cors({ credentials: true, origin: `http://localhost:3000` }));
app.use(express.json());
app.use(cookieParser());

//mongoose.set('strictQuery', false);
//mongoose.set('bufferCommands', false);

mongoose.connect(
  "mongodb+srv://mongo:mongo@clusterheng.uam6uok.mongodb.net/AIS?retryWrites=true&w=majority&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

connection.on("error", (error) => {
  console.error(error);
});

//Method 1 - define the schema in the Server.js
/*const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, min: 4, unique: true },
    password: { type: String, required: true },
    roles: {type:[String]},
    termPolicy: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
*/

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, roles, termPolicy } = req.body;

  //method 1 - define the schema within the server.js and save() is used.
 /* const userDoc = new UserModel(req.body);
 
  userDoc.password = bcrypt.hashSync(password, salt);
  userDoc.createdAt = new Date();
  await userDoc
    .save()
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      console.error(err);
      res.send("Error saving data to the database");
    });
 */
  //Another method 2 - using User.js outside the server.js and create() is used
  try {  
   const userDoc = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, salt),
      termPolicy,
    });
    res.json(userDoc);
  } catch (err) {
    console.log(err);
   res.status(400).json(err);
 } 
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
 // console.log("User Email: " + userDoc.email);
 // console.log("User Password: " + password);
  if(!userDoc){
    console.log("User does not exist!");
    const errorMsg = {Code: 11111, Error:'User does not exist!!!'};
    return res.send(errorMsg);   
  } 
 const passOK = bcrypt.compareSync(password, userDoc.password);

  if (passOK) {
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        email,
      });
    });
  } else {
    res.status(400).json("Wrong Credentials!");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(Port, () => {
  console.log("Server listening on port " + Port);
});
