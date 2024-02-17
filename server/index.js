const express = require('express');
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const {connectDB} = require("./db/connection");
const signupRouter = require('./routes/signup');

// Middleware.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/nonadmin', signupRouter);

app.get('/', (req, res) => {
    res.send("Home Page");
});

const PORT = process.env.PORT || 8081;
const MongooseUri = process.env.MongooseUri;
if(!PORT || !MongooseUri){
    console.log("Error: Environment variables not found, make sure to configure.")
    process.exit(1);
}

//database connection
connectDB(MongooseUri);

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});
