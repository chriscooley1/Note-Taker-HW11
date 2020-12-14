const fs = require("fs");
const util = require("util");
var notesData = require("../db/db.json");
const { v4:uuidv4 } = require("uuid");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function(app){
    app.get("/api/notes", function(req, res){
        readFileAsync("./db/db.json", "utf8").then(notes=>{
            notes = JSON.parse(notes);
            res.json(notes);
        })
        .catch;
    });

    app.post("/api/notes", function(req, res){
        readFileAsync("./db/db.json", "utf8").then(notes=>{
            notes = JSON.parse(notes);
            let updatedNote = {...req.body, id:uuidv4()};
            notes.push(updatedNote);
            writeFileAsync("./db/db.json", JSON.stringify(notes));
        });

        notesData.push({...req.body, id:uuidv4()});
        fs.writeFile("./db/db.json", JSON.stringify(notesData), function(err, log) {
            if (err){
                throw err
            } else {
                res.json(true)
            }
        })
    });

    app.delete("/api/notes/:id", function(req, res){
        readFileAsync("./db/db.json", "utf8").then(notes=>{
            notes = JSON.parse(notes);
            let filteredNotes = notes.filter(note => note.id !== req.params.id);
            writeFileAsync("./db/db.json", JSON.stringify(filteredNotes)).then(()=>
            res.json({
                ok:true
            }));
        })
        .catch(err => res.status(500).json(err));
    });
};