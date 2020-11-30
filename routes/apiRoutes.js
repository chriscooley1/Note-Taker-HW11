var notesData = require("../db/db.json");

modules.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notesData)
    })
}