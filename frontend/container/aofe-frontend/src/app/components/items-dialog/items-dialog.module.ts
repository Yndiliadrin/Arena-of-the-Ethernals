import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsDialogComponent } from './items-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ItemsDialogComponent
  ],
  imports: [
    CommonModule,

    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ItemsDialogComponent
  ]
})
export class ItemsDialogModule { }
