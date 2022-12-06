const express = require('express');
const mongoose =require("mongoose");
const authRouter=require('./routes/auth');

const DBC = "mongodb+srv://mohammed:Iz6dlEpgHizswPWD@cluster0.gi5ml5k.mongodb.net/?retryWrites=true&w=majority";

const PORT = 3020

const app = express();

app.use(express.json());
app.use(authRouter);


mongoose.connect(DBC).then(() => {
    console.log('Conneced :)');
}).catch((e) => { console.log(e); });


app.listen(PORT, "0.0.0.0", () => {
    console.log(`it's working in port ${PORT} `);
});