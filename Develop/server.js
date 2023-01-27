//Aadding pacakges that are required express 
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

//Middleware for parsing JSON and urlendeded from data

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Get route for index.html
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)
//Get route for notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)
//Get route for the db.json file
app.get('/api/notes', (req, res ) => 
    res.sendFile(path.join(__dirname, './db/db.json'))
)
//Post route to send the file in the json
app.post('/api/notes', (req, res) => { 
    var createNotes = req.body;
    var storedNotes = JSON.parse(fs.readFileSync('./db/db.json'))
    var totalNotes = (storedNotes.length).toString()

    createNotes.id = totalNotes

    storedNotes.push(createNotes)
//Posted into the db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(storedNotes))
    res.json(storedNotes)

})
//Console log so the user knows the local is listening and ready. Will also display rocketship
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
