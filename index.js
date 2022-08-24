require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const createprojectRoutes = require("./routes/createproject");
const projectManager = require("./routes/project-manager");
const blogRoutes = require("./routes/blogs");
const createBlogRoute = require("./routes/create-new-blog");

//database connection
connection();

//middlewares
app.use(express.json({limit: '3mb'}));
app.use(cors());

//routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/createproject",createprojectRoutes);
app.use("/project-manager",projectManager);
app.use("/new-blog-post",createBlogRoute);
app.use("/blogs",blogRoutes);

const port = process.env.PORT||8080;
app.listen(port,()=>console.log(`Listening on port ${port} successfully`));