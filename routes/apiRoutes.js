const fs = require("fs");
var notesData = require("../db/db.json");
const { v4:uuidv4 } = require("uuid");

module.exports = function(app){
    app.get("/api/notes", function(req, res){
        res.json(notesData)
    });

    app.post("/api/notes", function(req, res){
        notesData.push({...req.body, id:uuidv4()})
        fs.writeFile("db/db.json", JSON.stringify(notesData), function(err, log) {
            if (err){
                throw err
            } else {
                res.json(true)
            }
        })
    });

    app.delete("/api/notes/:id", function(req, res){
        const filteredNotes = notesData.filter(note => note.id !== req.params.id);
        fs.writeFile("db/db.json", JSON.stringify(filteredNotes), function(err, log){
            if (err){
                throw err
            } else {
                res.json(true)
            }
        })
    });
};