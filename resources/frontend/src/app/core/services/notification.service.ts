import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSuccessNotification(message: string) {
    this.snackBar.open(message, '', this.setConfig('success'))
  }

  showErrorNotification(message: string) {
    this.snackBar.open(message, '', this.setConfig('error'))
  }

  setConfig(type: string) {
    const style = type === 'success'
      ? 'bg-green-600'
      : 'bg-rose-600'
    const config: MatSnackBarConfig = {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3300,
      panelClass: [style]
    }
    return config;
  }
}
