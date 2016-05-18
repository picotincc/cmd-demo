const express = require("express");
const app = express();

app.use(express.static("./public"));

app.listen(8080, () => {
    console.log("The server is running on the http://localhost:8080...");
})
