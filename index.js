require("dotenv").config();
const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");

const indexRouter = require("./routers/indexRouter");

app.use(cors());
app.use("/api/v1", indexRouter);

const PORT = process.env.PORT || 3000;
http.listen(PORT, function () {
    console.log("The api is on port " + PORT);
});
