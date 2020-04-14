import { objp } from "./presentation.js";
import { NewEntry } from "./newEntry.js";
export class ButtonOperations {
  objN: NewEntry = new NewEntry();
  createNewButtons() {
    let buttonDeleteAll = document.createElement("button");
    buttonDeleteAll.setAttribute("id", "deleteAll");
    buttonDeleteAll.innerHTML = "Delete Selected";
    buttonDeleteAll.setAttribute("class", "btn btn-danger");
    document.getElementById("div1")!.appendChild(buttonDeleteAll);
    buttonDeleteAll.onclick = () => {
      this.deleteMultipleRows();
    };
    let buttonNewEntry = document.createElement("button");
    buttonNewEntry.setAttribute("id", "NewEntry");
    buttonNewEntry.innerHTML = "New Entry";
    buttonNewEntry.setAttribute("class", "btn btn-primary");
    document.getElementById("div1")!.appendChild(buttonNewEntry);
    buttonNewEntry.onclick = () => {
      this.objN.MakeFormVisible();
    };
    document.getElementById("div1")!.appendChild(buttonNewEntry);
  }
  clickButtons(idEdit: string, idDelete: string, rowid: number) {
    let editButton = document.getElementById(idEdit)! as HTMLTableRowElement;
    editButton.onclick = () => {
      objp.editData(rowid);
    };
    //add delete button --------------------------
    let deleteButton = document.getElementById(
      idDelete
    )! as HTMLTableRowElement;
    deleteButton.onclick = () => {
      objp.deleteData(rowid);
    };
  }
  SwitchButton(b: number) {
    let id_edit = "edit" + b;
    let id_delete = "delete" + b;
    if (objp.flag[b] === false) {
      //change to save and cancel
      document.getElementById(id_edit)!.innerHTML = "save";
      document.getElementById(id_delete)!.innerHTML = "cancel";
      objp.flag[b] = true;
    } else {
      document.getElementById(id_delete)!.innerHTML = "delete";
      document.getElementById(id_edit)!.innerHTML = "edit";
      objp.flag[b] = false;
    }
  }
  deleteMultipleRows() {
    let checkBoxArray = document.getElementsByClassName(
      "checkboxes"
    ) as HTMLCollectionOf<HTMLInputElement>;
    let RowsToDelete: number[] = [];
    for (let index = 0; index < checkBoxArray.length; index++) {
      if (checkBoxArray[index].checked) {
        let row = checkBoxArray[index].parentNode!
          .parentNode as HTMLTableRowElement;
        RowsToDelete.push(+row.id);
      }
    }
    let tablebody = document.getElementsByTagName("tbody")[0];
    for (let index = 0; index <= RowsToDelete.length - 1; index++) {
      let row = document.getElementById(
        RowsToDelete[index].toString()
      )! as HTMLTableRowElement;
      fetch(`http://localhost:3000/CRUD/DELETE/${RowsToDelete[index]}`, {
        method: "delete"
      }).then(res => {
        row.parentNode!.removeChild(row);
      });
    }
    objp.rowCount = (document.getElementById(
      "empTable"
    )! as HTMLTableElement).rows.length;
  }
}