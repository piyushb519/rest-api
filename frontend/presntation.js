"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var businessLogic_js_1 = require("./businessLogic.js");
var businessLogic_js_2 = require("./businessLogic.js");
var businessLogic_js_3 = require("./businessLogic.js");
var buttonoperations_js_1 = require("./buttonoperations.js");
// import { Validation } from "./Validation.js";
var newEntry_js_1 = require("./newEntry.js");
var Presentation = /** @class */ (function () {
    //-------------------------------------------------------------------
    function Presentation() {
        this.flag = [];
        //object as attribute------------------------------------------------
        this.obj = new businessLogic_js_1.operations();
        this.objB = new buttonoperations_js_1.ButtonOperations();
        this.objN = new newEntry_js_1.NewEntry();
        document.getElementById("Inputform").style.visibility = "hidden";
        var button = document.getElementById("LOAD");
        button.addEventListener("click", this.loadAndRefresh);
    }
    Presentation.prototype.callBuisnessLogic = function () {
        var _this = this;
        this.obj.loadAndRefresh().then(function (response) {
            _this.create(response);
        });
    };
    Presentation.prototype.loadAndRefresh = function () {
        if (document.getElementById("LOAD").innerHTML == "LOAD DATA") {
            document.getElementById("LOAD").innerHTML = "REFRESH DATA";
        }
        else {
            var div = document.getElementById("div1");
            div.innerHTML = " ";
        }
        exports.objp.callBuisnessLogic();
    };
    Presentation.prototype.create = function (Emp) {
        //destructing---------------------------------------------------------
        this.datalen = Emp.length;
        this.Record = Emp.map(function (obj) { return Object.values(obj); });
        for (var i = 0; i < this.datalen; i++) {
            this.flag[i] = false;
        }
        var table = document.createElement("table");
        table.setAttribute("id", "empTable");
        table.setAttribute("class", "table  table-light table-hover");
        table.style.tableLayout = "fixed";
        var arrHeaders = new Array();
        arrHeaders = [
            "firstName",
            "middleName",
            "lastName",
            "Email",
            "phone",
            "Role",
            "Address",
            "Edit option",
            "Delete option",
            "Multiple select"
        ];
        var tr = table.insertRow(-1);
        //create Headers
        for (var h = 0; h < arrHeaders.length; h++) {
            var th = document.createElement("th");
            th.setAttribute("class", "table table-dark");
            th.innerHTML = arrHeaders[h];
            tr.appendChild(th);
        }
        for (var c = 0; c < this.datalen; c++) {
            tr = table.insertRow(-1);
            tr.setAttribute("id", Emp[c].id.toString());
            tr.style.textAlign = "center";
            tr.innerHTML =
                '<td  class="cell' +
                    Emp[c].id +
                    '">' +
                    Emp[c].firstName +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].id +
                    '">' +
                    Emp[c].middleName +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].id +
                    '">' +
                    Emp[c].lastName +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].id +
                    '">' +
                    Emp[c].email +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].id +
                    '">' +
                    Emp[c].phone +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].id +
                    '">' +
                    businessLogic_js_2.Role[Emp[c].role] +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].id +
                    '">' +
                    Emp[c].address +
                    "</td>" +
                    '<td> <button type="button" class="btn btn-dark"id="edit' +
                    Emp[c].id +
                    '"> edit </button></td>' +
                    '<td> <button type="button" class = "btn btn-danger"  id="delete' +
                    Emp[c].id +
                    '"> delete </button></td>' +
                    '<td><input type = "checkbox" class = "checkboxes" ></td>';
            this.class_name = "cell" + Emp[c].id;
        }
        document.getElementById("div1").appendChild(table);
        this.rowCount = table.rows.length;
        this.objB.createNewButtons();
        for (var c = 0; c < this.datalen; c++) {
            var idedit = "edit" + Emp[c].id;
            var iddelete = "delete" + Emp[c].id;
            this.objB.clickButtons(idedit, iddelete, Emp[c].id);
        }
    };
    Presentation.prototype.editData = function (row_num) {
        var _this = this;
        var id = "cell" + row_num;
        var row_element = document.getElementsByClassName(id);
        if (this.flag[row_num] === false) {
            this.objB.SwitchButton(row_num);
            var row_array = this.Record[row_num];
            for (var index = 0; index < row_element.length; index++) {
                if (index === 5) {
                    row_element[index].innerHTML = "<select id = \"role\">\n            <option value =\"0\">QA</option>\n            <option value =\"1\">Development</option>\n            <option value =\"2\">DevOps</option>\n            <option value =\"3\">UIDesign</option>\n            </select>";
                }
                else {
                    row_element[index].innerHTML = "<input type=\"text\" class  = \"form-control input-sm\" value = " + row_array[index] + " >";
                }
            }
        }
        else {
            var row_array = [];
            for (var i = 0; i < 7; i++) {
                if (i === 5) {
                    row_array[i] = row_element[i]
                        .childNodes[0].value;
                }
                else {
                    row_array[i] = row_element[i]
                        .childNodes[0].value;
                }
            }
            this.Record[row_num] = row_array;
            var changeEmployee = new businessLogic_js_3.Employee(this.Record[row_num][0], this.Record[row_num][1], this.Record[row_num][2], this.Record[row_num][3], this.Record[row_num][4], +this.Record[row_num][5], this.Record[row_num][6]);
            changeEmployee.id = row_num;
            fetch("http://localhost:3000/crud/edit/" + row_num, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(changeEmployee)
            }).then(function (res) {
                _this.objB.SwitchButton(row_num);
                for (var index = 0; index < row_element.length; index++) {
                    if (index === 5) {
                        row_element[index].innerHTML =
                            businessLogic_js_2.Role[+row_element[index].childNodes[0].value];
                    }
                    else {
                        row_element[index].innerHTML = row_element[index]
                            .childNodes[0].value;
                    }
                }
            });
        }
    };
    Presentation.prototype.deleteData = function (row_num) {
        var _this = this;
        var row_array = [];
        var rowid = row_num;
        row_array = this.Record[row_num];
        var row = document.getElementById(rowid.toString());
        if (this.flag[row_num] === false) {
            fetch("http://localhost:3000/crud/delete/" + row_num, {
                method: "delete"
            }).then(function (res) {
                row.parentNode.removeChild(row);
                _this.rowCount = document.getElementById("empTable").rows.length;
            });
        }
        else {
            for (var i = 0; i < 7; i++) {
                if (i === 5) {
                    var check = typeof row_array[i];
                    if (check === "number") {
                        var x = row_array[i];
                        row.cells[i].innerHTML = businessLogic_js_2.Role[x];
                    }
                    else if (check === "string") {
                        row.cells[i].innerHTML = row_array[i];
                    }
                }
                else {
                    row.cells[i].innerHTML = row_array[i];
                }
            }
            this.objB.SwitchButton(row_num);
        }
    };
    return Presentation;
}());
exports.objp = new Presentation();
