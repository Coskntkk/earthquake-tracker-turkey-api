require("dotenv").config();
const app = require("express")();
const morgan = require("morgan");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(morgan("dev"));

// Routers
const indexRouter = require("./routers/indexRouter");
app.use("/", indexRouter);

// Error handling
const globalErrorHandler = require("./utils/globalErrorHandler");
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("The api is on port " + PORT);
});
