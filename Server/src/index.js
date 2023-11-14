const express = require("express");
const app = express();
require('dotenv').config()
const cors = require('cors');
const mongoose = require("mongoose");
const route = require('./Routes/index.route')
const ConnectDB = require('./config/db.config')

const port = process.env.PORT || 3002

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
route(app);
// const ConnectDB = async () => {
//     try { 
//         await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat',
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             });
//         console.log("MongoDB Connected.")
//     }
//     catch (error) {
//         console.log(error)
//     }
// }
// ConnectDB();
ConnectDB();
app.listen(port, () => {
    console.log("Server is running on port:"+port);
});



