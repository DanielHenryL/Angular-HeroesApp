import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBar} from '@angular/material/snack-bar';
import { Data } from '../../interfaces/data-snackbar.interface';

@Component({
  selector: 'app-snackbar-confirm',
  templateUrl: './snackbar-confirm.component.html',
  styleUrl: './snackbar-confirm.component.css'
})
export class SnackbarConfirmComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data:Data
  ){
    console.log( data);
  }
}
