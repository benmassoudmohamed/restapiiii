const express = require('express')
const bodyparser = require('body-parser')
const cors=require('cors')
const app = express()
const { MongoClient, ObjectId } = require('mongodb')
app.use(bodyparser.json())
app.use(cors())
// const mongo_URL = "mongodb://localhost:27017"//lien local
const mongo_URL="mongodb+srv://mohamed44:mohamed123@cluster0-xzmjx.mongodb.net/<dbname>?retryWrites=true&w=majority"
const dbName = "Contact"
MongoClient.connect(mongo_URL,{useUnifiedTopology:true},(er, client) => {
    if (er) {
        console.log(er)
    } else {
        console.log("db is connected")
        const db = client.db(dbName)

app.get('/find_all', (req, res) => {
db.collection('ContactList').find().toArray((er, data) => {
if (er) console.log(er)
else res.send(data)}) 
})
app.get('/find_one/:id',(req,res)=>{
    let id=ObjectId(req.params.id)
    db.collection('contactList').findOne({_id:id},(er,data)=>{
        if(er)console.log(er)
        else res.send(data)
    })
   
})

app.post('/add_contact',(req,res)=>{
  let new_contact=req.body   
db.collection('ContactList').insertOne(new_contact)
.then(result=>res.send(result))
.catch(er=>console.log(er))
})

app.put('/edit_contact/:id',(req,res)=>{
    let id=ObjectId(req.params.id)
    let Modified_contact=req.body
    db.collection('ContactList').findOneAndReplace({_id:id},Modified_contact)
    .then(result=>res.send(result))
    .catch(er=>console.log(er))
})
app.delete('/delete/:id',(req,res)=>{
    let id=ObjectId(req.params.id)
    db.collection('ContactList').findOneAndDelete({_id:id})
    .then(result=>res.send(result))
    .catch(er=>console.log(er)) 
    
})

}
})
app.listen(4000, (er) => {
    if (er) console.log(er)
    else console.log('server is connected on port 4000')

})

