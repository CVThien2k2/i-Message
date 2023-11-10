const express = require("express");
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");
const route = require('./Routes/index.route')


const port = process.env.PORT || 3002

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


route(app);
//configure mongoose
const ConnectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log("MongoDB Connected.")
    }
    catch (error) {
        console.log(error)
    }
}


ConnectDB();

app.listen(port, () => {
    console.log("Server is running on port:"+port);
});



