import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
