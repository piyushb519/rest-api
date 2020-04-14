"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presentation_js_1 = require("./presentation.js");
var businessLogic_js_1 = require("./businessLogic.js");
var NewEntry = /** @class */ (function () {
    function NewEntry() {
    }
    NewEntry.prototype.MakeFormVisible = function () {
        var _this = this;
        var formdiv = document.getElementById("Inputform");
        formdiv.style.visibility = "visible";
        var submitbutton = document.getElementById("submit");
        submitbutton.onclick = function () {
            _this.NewEntry();
        };
    };
    NewEntry.prototype.NewEntry = function () {
        var tbody = document.getElementsByTagName("tbody")[0];
        var newflag = false;
        presentation_js_1.objp.flag.push(newflag);
        var row_Count = presentation_js_1.objp.rowCount - 1;
        var newRow = document.createElement("tr");
        newRow.style.textAlign = "center";
        tbody.appendChild(newRow);
        newRow.setAttribute("id", row_Count.toString());
        var fname = document.getElementById("fname").value;
        var mname = document.getElementById("mname").value;
        var lname = document.getElementById("lname").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("ph").value;
        var roleVal = parseInt(document.getElementById("role1").value);
        var address = document.getElementById("addr").value;
        var objE = new businessLogic_js_1.Employee(fname, mname, lname, email, parseInt(phone), roleVal, address);
        objE.id = row_Count;
        fetch("http://localhost:3000/crud/createnew", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objE)
        }).then(function (res) {
            newRow.innerHTML =
                '<td class = "cell' +
                    row_Count +
                    '">' +
                    objE.firstName +
                    "</td>" +
                    '<td class = "cell' +
                    row_Count +
                    '">' +
                    objE.middleName +
                    "</td>" +
                    '<td class = "cell' +
                    row_Count +
                    '">' +
                    objE.lastName +
                    "</td>" +
                    '<td class = "cell' +
                    row_Count +
                    '">' +
                    objE.email +
                    "</td>" +
                    '<td class = "cell' +
                    row_Count +
                    '">' +
                    objE.phone +
                    "</td>" +
                    '<td class = "cell' +
                    row_Count +
                    '">' +
                    objE.role +
                    "</td>" +
                    '<td class = "cell' +
                    row_Count +
                    '"><' +
                    objE.address +
                    "/td>" +
                    '<td><button type="button" class="btn btn-dark"id="edit' +
                    row_Count +
                    '"> edit </button></td>' +
                    '<td><button type="button" class = "btn btn-danger"  id="delete' +
                    row_Count +
                    '"> delete </button></td>' +
                    '<td><input type = "checkbox" class = "checkboxes" ></td>';
            //calling edit and delete functions
            presentation_js_1.objp.rowCount = document.getElementById("empTable").rows.length;
            var idedit = "edit" + row_Count;
            var iddelete = "delete" + row_Count;
            var editButton = document.getElementById(idedit);
            editButton.onclick = function () {
                presentation_js_1.objp.editData(row_Count);
            };
            //add delete button --------------------------
            var deleteButton = document.getElementById(iddelete);
            deleteButton.onclick = function () {
                presentation_js_1.objp.deleteData(row_Count);
            };
        });
        document.getElementById("Inputform").style.visibility = "hidden";
    };
    return NewEntry;
}());
exports.NewEntry = NewEntry;
