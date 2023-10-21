const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const rootRoutes = require("./routes/root");
const createError = require("http-errors");
const requestTime = require("./middleware/request-time");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));
app.use(requestTime);
app.use("/", rootRoutes);
app.use((request, response, next) => {
    next(createError(404));
});

if (process.env.NODE_ENV == "development") {
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, "backend", "static"));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
}



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
