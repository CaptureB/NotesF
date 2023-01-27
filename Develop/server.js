const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('/api/notes', (req, res ) => 
    res.sendFile(path.join(__dirname, './db/db.json'))
)

app.post('/api/notes', (req, res) => { 
    var createNotes = req.body;
    var storedNotes = JSON.parse(fs.readFileSync('./db/db.json'))
    var totalNotes = (storedNotes.length).toString()

    createNotes.id = totalNotes

    storedNotes.push(createNotes)

    fs.writeFileSync('./db/db.json', JSON.stringify(storedNotes))
    res.json(storedNotes)

})




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
