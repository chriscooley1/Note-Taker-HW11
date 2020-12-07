const fs = require("fs");
const util = require("util");
var notesData = require("../db/db.json");
const { v4:uuidv4 } = require("uuid");
const writeFileAsync = util.promisify(fs.writeFile);

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
        console.log(filteredNotes)
        writeFileAsync("db/db.json", JSON.stringify(filteredNotes)).then(()=>
        res.json({
            ok:true
        }))
        .catch(err => res.status(500).json(err))
    });
};