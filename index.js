//Crear servidor
import express from 'express'
import {__dirname} from './utils.js'
import path from "path";
const app = express()
//Http import
import  http from  'http'
const server = http.createServer(app)

//Views Engine require
import handlebars from 'express-handlebars'
// Import Routes
import homeRouter from './router/home.router.js'
//Socket import
import  {Server} from 'socket.io'
const io = new Server(server)

const PORT = 8080 || process.env.PORT

//Public
app.use(express.static(__dirname+'/public'))

//Views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//Routes
app.use('/home', homeRouter)

let messages = []

//Sockect
io.on('connection', (socket)=>{
  console.log('New user conected')
  socket.emit('wellcome', 'Hola cliente, bienvenido')
  io.sockets.emit('messages-all', messages)

  socket.on('new-message', (data)=>{
   
    messages.push(data) 
    console.log("data",messages)
    io.sockets.emit('messages-all', messages)
  })
})

server.listen(PORT, ()=>{
  console.log('Server runnig on port 8080')
})