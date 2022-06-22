// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// TO USE WHEN WE DO THE MIDDLEWARE WITH JWT ---> const { isAuthenticated } = require('./middlewares/jwt.middleware')

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const authRouter = require('./routes/auth.routes')
app.use('/auth', authRouter)

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);


// testing front-backend connection:
const testAPIRouter = require("./routes/testAPI");
app.use("/testAPI", testAPIRouter);



// const experiencesRouter = require('./routes/experiences.routes')
// app.use('/api/experiences', /*isAuthenticated,*/ experiencesRouter)

/* const commentsRouter = require('./routes/comments.routes')
app.use('/api/comments', /*isAuthenticated,*/ /*commentsRouter)*/



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
