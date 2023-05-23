const http  =  require("http")
const express = require("express")
const cors = require("cors")
const socketIO =  require("socket.io")

const app = express();

const port = 4000 || process.env.port;


const users = [{}]


app.use(cors())

app.get("/",(req,res)=>{
    res.send("Received, Okei");
})

const server = http.createServer(app)

const io = socketIO(server)



io.on("connection",(socket)=>{
    console.log("new connection");

    socket.on('join',({user})=>{
        users[socket.id] = user


        console.log(`${user} just joined`)

        socket.broadcast.emit('userjoined',{user:"Admin",message:` ${users[socket.id]} has joined`})
        socket.emit('Welcome',{user:"Admin",message:`Welcome to the Server, ${users[socket.id]}`})

      
    })


    //Now actual chat application

    socket.on('message',({message,id})=>{

       io.emit('sendMessage',{user:users[id],message,id})
    })

    
     socket.on('disconn',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`})


        // console.log(`user left`)
     })
    

    

})


server.listen(port,()=>{
    console.log(`server listining http://localhost:${port}`);
    
    // console.log("Something")
})