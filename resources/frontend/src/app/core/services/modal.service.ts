import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openFormModal(component: any,data?:any){
    const config = {
      height: 'fit-content',
      maxHeight: 'fit-content',
      width: 'fit-content',
      maxWidth: '98vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      panelClass: 'modal-box'
    }
    Object.assign(config, data ? {data} : config);

    return this.dialog.open(component,config)
  }
}
