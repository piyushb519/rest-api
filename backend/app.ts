"use strict";
import { request } from "http";
import { chmod, readFileSync } from "fs";
import { raw } from "body-parser";
import { Request, Response } from "express";

let express = require("express");
let fs = require("file-system");
let bodyParser = require("body-parser");
let app = express();
let port = 3000;
//server started
function modify_json() {
  let raw_json = fs.readFileSync("/data.json");
  let current_json = JSON.parse(raw_json);
  for (let i = 0; i < current_json.length; i++) {
    current_json[i].id = i;
  }
}
app.listen(port, (err: Error, res: Response) => {
  if (err) {
    console.log("something went wrong");
  } else {
    console.log("server started on port 3000");
  }
});

app.use(bodyParser.json());
//for creating new entry in json

app.post("/crud/createnew", function(req: Request, res: Response) {
  const data = fs.readFileSync(__dirname + "/data.json");
  const actual_data = JSON.parse(data);
  actual_data.push(req.body);
  fs.writeFile("./data.json", JSON.stringify(actual_data), (err: Error) => {
    if (err) {
      console.error(Error);
    } else {
      res.send("created");
    }
  });
});
//fetching data from json
app.get("/crud/fetch", (req: Request, res: Response) => {
  modify_json();
  console.log("request received");
  let raw_data = fs.readFileSync("data.json");
  let actual_data = JSON.parse(raw_data);
  res.send(actual_data);
});
//updating an entry in json
app.put("/crud/edit/:id", (req: Request, res: Response) => {
  let id = req.params.id;
  const raw_data = fs.readFileSync("data.json");
  const actual_data = JSON.parse(raw_data);
  console.log("in edit request");
  const object = req.body;
  for (let i = 0; i < actual_data.length; i++) {
    if (actual_data[i].id == id) {
      actual_data[i] = object;
      break;
    }
  }
  fs.writeFile("./data.json", JSON.stringify(actual_data), (err: Error) => {
    if (err) {
      console.error(Error);
    } else {
      res.send("edited");
    }
  });
});
//deleting an entry from json
app.delete("/crud/delete/:id", (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  let raw_data = fs.readFileSync("data.json");
  let actual_data = JSON.parse(raw_data);
  for (let i = 0; i < actual_data.length; i++) {
    if (actual_data[i].id == id) {
      actual_data.splice(i, 1);
      break;
    }
  }

  fs.writeFileSync("./data.json", JSON.stringify(actual_data));
  res.send("deleted");
});