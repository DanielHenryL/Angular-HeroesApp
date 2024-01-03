import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-confirm',
  templateUrl: './snackbar-confirm.component.html',
  styleUrl: './snackbar-confirm.component.css'
})
export class SnackbarConfirmComponent {
  snackBarRef = inject(MatSnackBarRef);
}
