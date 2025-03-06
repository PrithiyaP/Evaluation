import { Component } from '@angular/core';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  private params: any;
  isEditing = false;

  agInit(params: any): void {
    this.params = params;
    debugger
  }

  refresh(): boolean {
    return false;
  }

  onEditClick(): void {

    this.isEditing = true;


  }

  onCancelClick(): void {

    this.isEditing = false;
    this.params.api.refreshCells({ rowNodes: [this.params.node] });
  }

}






