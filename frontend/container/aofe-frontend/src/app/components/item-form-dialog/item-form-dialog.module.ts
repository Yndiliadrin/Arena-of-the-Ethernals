import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormDialogComponent } from './item-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ItemFormDialogComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule

  ],
  exports: [ItemFormDialogComponent]
})
export class ItemFormDialogModule { }
