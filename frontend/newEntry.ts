import { objp } from "./presentation.js";
import { Employee } from "./businessLogic.js";
import { Role } from "./businessLogic.js";
export class NewEntry {
  MakeFormVisible() {
    let formdiv = document.getElementById("Inputform");
    formdiv!.style.visibility = "visible";
    let submitbutton = document.getElementById("submit")! as HTMLInputElement;
    submitbutton.onclick = () => {
      this.NewEntry();
    };
  }
  NewEntry() {
    let tbody = document.getElementsByTagName("tbody")[0];
    let newflag = false;
    objp.flag.push(newflag);
    let row_Count = objp.rowCount - 1;
    let newRow = document.createElement("tr");
    newRow.style.textAlign = "center";
    tbody.appendChild(newRow);
    newRow.setAttribute("id", row_Count.toString());
    let fname = (document.getElementById("fname")! as HTMLInputElement).value;
    let mname = (document.getElementById("mname")! as HTMLInputElement).value;
    let lname = (document.getElementById("lname")! as HTMLInputElement).value;
    let email = (document.getElementById("email")! as HTMLInputElement).value;
    let phone = (document.getElementById("ph")! as HTMLInputElement).value;
    let roleVal = parseInt(
      (document.getElementById("role1")! as HTMLSelectElement).value
    );
    let address = (document.getElementById("addr")! as HTMLInputElement).value;
    let objE = new Employee(
      fname,
      mname,
      lname,
      email,
      parseInt(phone),
      roleVal,
      address
    );
    objE.id = row_Count;
    fetch(`http://localhost:3000/crud/createnew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objE)
    }).then(res => {
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
      objp.rowCount = (document.getElementById(
        "empTable"
      )! as HTMLTableElement).rows.length;
      let idedit = "edit" + row_Count;
      let iddelete = "delete" + row_Count;
      let editButton = document.getElementById(idedit)! as HTMLTableRowElement;
      editButton.onclick = () => {
        objp.editData(row_Count);
      };
      //add delete button --------------------------
      let deleteButton = document.getElementById(
        iddelete
      )! as HTMLTableRowElement;
      deleteButton.onclick = () => {
        objp.deleteData(row_Count);
      };
    });
    document.getElementById("Inputform")!.style.visibility = "hidden";
  }
}