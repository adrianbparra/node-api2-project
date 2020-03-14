const express = require("express")
const server = express();

const postsRouter = require("./posts-router");


server.use(express.json())




server.use("/api/posts", postsRouter)

server.get("/", (req,res) =>res.send(`Welcome to Adrian's API`))




module.exports = server;