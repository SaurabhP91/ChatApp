var express = require('express')
var bodyParser = require('body-parser')

var http = require('http').Server(app)
var io = require('socket.io')(http)

var mongoose=require('mongoose')
var port= process.env.PORT || 8000

var app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var dburl= 'mongodb+srv://saurabhP91:guttu09012001@cluster0.hxabaao.mongodb.net/?retryWrites=true&w=majority'
var messages = [
    {name:"John",message:"Hello"},
    {name:"Adam",message:"Hi"}
]

app.get('/messages', (req,res)=>{

    res.send(messages)
})

app.post('/messages', (req,res)=>{

    console.log(req.body)

   messages.push(req.body)
   io.emit('message',req.body)

    res.sendStatus(200)
})


/*deprecated
mongoose.connect(dburl, (err)=>{
    console.log('mongodb connection successful')
}) 
*/
//new
(async()=>{
    await mongoose.connect();
    console.log('mongodb connected')

})


app.listen(8000)
console.log("Listening.....")

