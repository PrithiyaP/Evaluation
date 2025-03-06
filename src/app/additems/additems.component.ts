import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css']
})
export class AdditemsComponent {
  form!: FormGroup;
  formvalue: any;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AdditemsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      itemno: null,
      itemdesc: null,
      locid: null,
      locdesc: null,
      snapshotid: null,
      Timestamp: null,
      Quantity: null
    });

  }
  submit() {
    this.formvalue = this.form.getRawValue();
    this.dialogRef.close(this.formvalue);
  }


}



