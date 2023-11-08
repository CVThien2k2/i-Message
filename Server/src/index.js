const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//configure mongoose
const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "localhost",
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
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});



