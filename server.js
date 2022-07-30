const express = require("express");
const bodyParser= require('body-parser')
const app = express();
app.use(bodyParser.json())
const MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'))
app.set('view engine', 'ejs')
let PORT = 3005;
let myDbName = "QuotesDB";
let myCollectionName = "quotesCollection";
app.use(bodyParser.urlencoded({ extended: true }))
let uri = "mongodb+srv://demoproject:demoproject123321@quotesdb.uclozfl.mongodb.net/test?retryWrites=true&w=majority"

// MongoClient.connect(uri, { useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database')
//     })
//     .catch(error => console.error(error))

const client = new MongoClient(uri)

client.connect()
    .then(()=>console.log("connected to Database"))
    .catch(error => console.error(error))


// All your handlers here...

app.get("/", (request, response)=>{
    client.db(myDbName).collection(myCollectionName).find().toArray()
        .then(theData => {
            console.log("Hey, I found Everything...here you go!")
            console.log(theData)
            response.render("index.ejs", {

                quotes:theData

            })
        })
    // response.sendFile(__dirname + "/index.ejs");

})





app.post("/quotes", (req, res)=>{
    let name = req.body.name;
    let quote = req.body.quote;

    client.db("QuotesDB").collection("quotesCollection").insertOne(req.body,()=>{
        console.log("Hey, Everything Was Fine and I added the quote to your db.")
        console.log(req.body)
        res.redirect("/");
    });

})




app.put("/quotes",(request, response) =>{
    client.db(myDbName).collection(myCollectionName).findOneAndUpdate(
        { name: request.body.oldName },
        {
            $set: {
                name: request.body.name,
                quote: request.body.quote
            }
        },
        {
            upsert: true
        },()=> {
            // response.redirect("/")
        }
    )
}
)


app.delete('/quotes', (req, res) => {
    client.db(myDbName).collection(myCollectionName).deleteOne(
        { name: req.body.name }
    )
})


///..........





app.listen(PORT, ()=>{
    console.log("Listening on: " + PORT);
})
