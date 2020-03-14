const server = require("./server")

const port = 4000;


server.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})


