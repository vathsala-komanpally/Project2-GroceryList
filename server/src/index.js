const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import all routers
//const fruitRouter = require("./routes/fruitRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const groceryRouter = require("./routes/groceryRoutes");


mongoose.connect("mongodb://localhost:27017/GroceryStoreFullStack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialise app object
const app = express();

// This is the port your application will use
const port = 3000;

// Add middleware to be able to read and understand json files
app.use(express.json());
app.use(cors()); // CORS // Cross Origin Resource Sharing

// Tell express that it needs to use the routers we have initialised
//app.use("/api/fruits", fruitRouter);
app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);
app.use("/api/groceryItems", groceryRouter);


app.listen(port, () =>
  console.log(`Fruit app is listening at http://localhost:${port}`)
);