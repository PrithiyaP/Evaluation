import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { AdditemsComponent } from '../additems/additems.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  formvalue: any = [];
  params;

  rowData: any;
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {};
  gridApi: any;
  isEditing: boolean = false;

  constructor(private dialog: MatDialog, private http: HttpClient,) {

    this.columnDefs = [{ field: 'itemno', filter: 'agTextColumnFilter', sortable: true, floatingFilter: true, headerName: 'Itemno' },
    { field: 'itemdesc', headerName: 'Itemdesc' },
    { field: 'locid', headerName: 'LOCID' },
    { field: 'locdesc', headerName: 'Locdesc' },
    { field: 'snapshotid', filter: 'agTextColumnFilter', sortable: true, floatingFilter: true, headerName: 'Snapshotid' },
    { field: 'Timestamp', headerName: 'Timestamp' },
    {
      field: 'Quantity', filter: 'agTextColumnFilter', sortable: true, floatingFilter: true, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: Array.from({ length: 1000 }, (_, i) => i)
      }, headerName: 'Quantity', editable: true
    },
    {
      field: 'Action', headerName: 'Action', cellRenderer: (params) => {
        this.params = params

        return `<button id="edit" *ngIf="!isEditing" onclick="onEditClick()">Edit</button>
            <button id="cancel" *ngIf="isEditing" (click)="onCancelClick()">Cancel</button>`}
    }
    ]

    this.http.get<any[]>('assets/items.json').subscribe(data => {
      this.rowData = data;
      this.formvalue = this.rowData
    });

  }

  additems() {
    const dialogRef = this.dialog.open(AdditemsComponent, {
      width: '900px'

    })

    dialogRef.afterClosed().subscribe(data => {
      let object = { ...data }
      this.formvalue.push(object)
      this.rowData = this.formvalue
      this.gridApi.setRowData(this.formvalue);
    })
  }
  ngOnInit(): void {
    // console.log(this.item);  
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onEditClick(): void {
    this.isEditing = true;

  }

}






