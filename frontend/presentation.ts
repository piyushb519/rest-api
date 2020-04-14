import { CRUD } from "./businessLogic.js";
import { operations } from "./businessLogic.js";
import { Role } from "./businessLogic.js";
import { Employee } from "./businessLogic.js";
import { ButtonOperations } from "./buttonoperations.js";
// import { Validation } from "./Validation.js";
import { NewEntry } from "./newEntry.js";
class Presentation implements CRUD<Employee, number> {
  //attributes
  datalen: number;
  rowCount: number;
  class_name: string;
  flag: boolean[] = [];
  Record: Array<any[]>;
  //object as attribute------------------------------------------------
  obj: operations = new operations();
  objB: ButtonOperations = new ButtonOperations();
  objN: NewEntry = new NewEntry();
  callBuisnessLogic() {
    this.obj.loadAndRefresh().then(response => {
      this.create(response);
    });
  }
  //-------------------------------------------------------------------
  constructor() {
    document.getElementById("Inputform")!.style.visibility = "hidden";
    let button = document.getElementById("LOAD");
    button!.addEventListener("click", this.loadAndRefresh);
  }
  loadAndRefresh() {
    if (document.getElementById("LOAD")!.innerHTML == "LOAD DATA") {
      document.getElementById("LOAD")!.innerHTML = "REFRESH DATA";
    } else {
      let div = document.getElementById("div1")! as HTMLElement;
      div.innerHTML = " ";
    }
    objp.callBuisnessLogic();
  }
  create(Emp: Employee[]) {
    //destructing---------------------------------------------------------
    this.datalen = Emp.length;
    this.Record = Emp.map(obj => Object.values(obj));
    for (let i = 0; i < this.datalen; i++) {
      this.flag[i] = false;
    }
    let table = document.createElement("table");
    table.setAttribute("id", "empTable");
    table.setAttribute("class", "table  table-light table-hover");
    table.style.tableLayout = "fixed";
    let arrHeaders = new Array();
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

    let tr = table.insertRow(-1);
    //create Headers
    for (let h = 0; h < arrHeaders.length; h++) {
      let th = document.createElement("th");
      th.setAttribute("class", "table table-dark");
      th.innerHTML = arrHeaders[h];
      tr.appendChild(th);
    }
    for (let c = 0; c < this.datalen; c++) {
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
        Role[Emp[c].role] +
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
    document.getElementById("div1")!.appendChild(table);
    this.rowCount = table.rows.length;
    this.objB.createNewButtons();
    for (let c = 0; c < this.datalen; c++) {
      let idedit = "edit" + Emp[c].id;
      let iddelete = "delete" + Emp[c].id;
      this.objB.clickButtons(idedit, iddelete, Emp[c].id);
    }
  }
  editData(row_num: number) {
    let id = "cell" + row_num;
    let row_element = document.getElementsByClassName(id);
    if (this.flag[row_num] === false) {
      this.objB.SwitchButton(row_num);
      let row_array: any[] = this.Record[row_num];
      for (let index = 0; index < row_element.length; index++) {
        if (index === 5) {
          row_element[index].innerHTML = `<select id = "role">
            <option value ="0">QA</option>
            <option value ="1">Development</option>
            <option value ="2">DevOps</option>
            <option value ="3">UIDesign</option>
            </select>`;
        } else {
          row_element[
            index
          ].innerHTML = `<input type="text" class  = "form-control input-sm" value = ${row_array[index]} >`;
        }
      }
    } else {
      let row_array: any[] = [];
      for (let i = 0; i < 7; i++) {
        if (i === 5) {
          row_array[i] = (row_element[i]
            .childNodes[0] as HTMLInputElement).value;
        } else {
          row_array[i] = (row_element[i]
            .childNodes[0] as HTMLInputElement).value;
        }
      }
      this.Record[row_num] = row_array;
      let changeEmployee = new Employee(
        this.Record[row_num][0],
        this.Record[row_num][1],
        this.Record[row_num][2],
        this.Record[row_num][3],
        this.Record[row_num][4],
        +this.Record[row_num][5],
        this.Record[row_num][6]
      );
      changeEmployee.id = row_num;
      fetch(`http://localhost:3000/crud/edit/${row_num}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(changeEmployee)
      }).then(res => {
        this.objB.SwitchButton(row_num);
        for (let index = 0; index < row_element.length; index++) {
          if (index === 5) {
            row_element[index].innerHTML =
              Role[
                +(row_element[index].childNodes[0] as HTMLInputElement).value
              ];
          } else {
            row_element[index].innerHTML = (row_element[index]
              .childNodes[0] as HTMLInputElement).value;
          }
        }
      });
    }
  }
  deleteData(row_num: number) {
    let row_array: any[] = [];
    let rowid = row_num;
    row_array = this.Record[row_num];
    let row: HTMLTableRowElement = document.getElementById(
      rowid.toString()
    )! as HTMLTableRowElement;
    if (this.flag[row_num] === false) {
      fetch(`http://localhost:3000/crud/delete/${row_num}`, {
        method: "delete"
      }).then(res => {
        row.parentNode!.removeChild(row);
        this.rowCount = (document.getElementById(
          "empTable"
        )! as HTMLTableElement).rows.length;
      });
    } else {
      for (let i = 0; i < 7; i++) {
        if (i === 5) {
          let check: string = typeof row_array[i];
          if (check === "number") {
            let x = row_array[i];
            row.cells[i].innerHTML = Role[x];
          } else if (check === "string") {
            row.cells[i].innerHTML = row_array[i];
          }
        } else {
          row.cells[i].innerHTML = row_array[i];
        }
      }
      this.objB.SwitchButton(row_num);
    }
  }
}

export let objp = new Presentation();