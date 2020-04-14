"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presentation_js_1 = require("./presentation.js");
var newEntry_js_1 = require("./newEntry.js");
var ButtonOperations = /** @class */ (function () {
    function ButtonOperations() {
        this.objN = new newEntry_js_1.NewEntry();
    }
    ButtonOperations.prototype.createNewButtons = function () {
        var _this = this;
        var buttonDeleteAll = document.createElement("button");
        buttonDeleteAll.setAttribute("id", "deleteAll");
        buttonDeleteAll.innerHTML = "Delete Selected";
        buttonDeleteAll.setAttribute("class", "btn btn-danger");
        document.getElementById("div1").appendChild(buttonDeleteAll);
        buttonDeleteAll.onclick = function () {
            _this.deleteMultipleRows();
        };
        var buttonNewEntry = document.createElement("button");
        buttonNewEntry.setAttribute("id", "NewEntry");
        buttonNewEntry.innerHTML = "New Entry";
        buttonNewEntry.setAttribute("class", "btn btn-primary");
        document.getElementById("div1").appendChild(buttonNewEntry);
        buttonNewEntry.onclick = function () {
            _this.objN.MakeFormVisible();
        };
        document.getElementById("div1").appendChild(buttonNewEntry);
    };
    ButtonOperations.prototype.clickButtons = function (idEdit, idDelete, rowid) {
        var editButton = document.getElementById(idEdit);
        editButton.onclick = function () {
            presentation_js_1.objp.editData(rowid);
        };
        //add delete button --------------------------
        var deleteButton = document.getElementById(idDelete);
        deleteButton.onclick = function () {
            presentation_js_1.objp.deleteData(rowid);
        };
    };
    ButtonOperations.prototype.SwitchButton = function (b) {
        var id_edit = "edit" + b;
        var id_delete = "delete" + b;
        if (presentation_js_1.objp.flag[b] === false) {
            //change to save and cancel
            document.getElementById(id_edit).innerHTML = "save";
            document.getElementById(id_delete).innerHTML = "cancel";
            presentation_js_1.objp.flag[b] = true;
        }
        else {
            document.getElementById(id_delete).innerHTML = "delete";
            document.getElementById(id_edit).innerHTML = "edit";
            presentation_js_1.objp.flag[b] = false;
        }
    };
    ButtonOperations.prototype.deleteMultipleRows = function () {
        var checkBoxArray = document.getElementsByClassName("checkboxes");
        var RowsToDelete = [];
        for (var index = 0; index < checkBoxArray.length; index++) {
            if (checkBoxArray[index].checked) {
                var row = checkBoxArray[index].parentNode
                    .parentNode;
                RowsToDelete.push(+row.id);
            }
        }
        var tablebody = document.getElementsByTagName("tbody")[0];
        var _loop_1 = function (index) {
            var row = document.getElementById(RowsToDelete[index].toString());
            fetch("http://localhost:3000/CRUD/DELETE/" + RowsToDelete[index], {
                method: "delete"
            }).then(function (res) {
                row.parentNode.removeChild(row);
            });
        };
        for (var index = 0; index <= RowsToDelete.length - 1; index++) {
            _loop_1(index);
        }
        presentation_js_1.objp.rowCount = document.getElementById("empTable").rows.length;
    };
    return ButtonOperations;
}());
exports.ButtonOperations = ButtonOperations;
