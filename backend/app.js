"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("file-system");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;
//server started
function modify_json() {
    var raw_json = fs.readFileSync("/data.json");
    var current_json = JSON.parse(raw_json);
    for (var i = 0; i < current_json.length; i++) {
        current_json[i].id = i;
    }
}
app.listen(port, function (err, res) {
    if (err) {
        console.log("something went wrong");
    }
    else {
        console.log("server started on port 3000");
    }
});
app.use(bodyParser.json());
//for creating new entry in json
app.post("/crud/createnew", function (req, res) {
    var data = fs.readFileSync(__dirname + "/data.json");
    var actual_data = JSON.parse(data);
    actual_data.push(req.body);
    fs.writeFile("./data.json", JSON.stringify(actual_data), function (err) {
        if (err) {
            console.error(Error);
        }
        else {
            res.send("created");
        }
    });
});
//fetching data from json
app.get("/crud/fetch", function (req, res) {
    modify_json();
    console.log("request received");
    var raw_data = fs.readFileSync("data.json");
    var actual_data = JSON.parse(raw_data);
    res.send(actual_data);
    -b;
    samarpan - b;
    27;
    days;
    ago;
    Collaborator;
    error;
    handling ?
        :
    ;
});
//updating an entry in json
app.put("/crud/edit/:id", function (req, res) {
    var id = req.params.id;
    var raw_data = fs.readFileSync("data.json");
    var actual_data = JSON.parse(raw_data);
    console.log("in edit request");
    var object = req.body;
    for (var i = 0; i < actual_data.length; i++) {
        if (actual_data[i].id == id) {
            actual_data[i] = object;
            break;
        }
    }
    fs.writeFile("./data.json", JSON.stringify(actual_data), function (err) {
        if (err) {
            console.error(Error);
        }
        else {
            res.send("edited");
        }
    });
});
//deleting an entry from json
app.delete("/crud/delete/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var raw_data = fs.readFileSync("data.json");
    var actual_data = JSON.parse(raw_data);
    for (var i = 0; i < actual_data.length; i++) {
        if (actual_data[i].id == id) {
            actual_data.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync("./data.json", JSON.stringify(actual_data));
    res.send("deleted");
});
