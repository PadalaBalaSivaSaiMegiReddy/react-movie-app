const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");


const app = express();
app.use(express.json());
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening to ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err);
})

app.use("/api/auth",authRoute);
