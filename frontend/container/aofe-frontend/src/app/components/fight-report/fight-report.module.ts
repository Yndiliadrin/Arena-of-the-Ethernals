import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FightReportComponent } from './fight-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    FightReportComponent
  ],
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [FightReportComponent]
})
export class FightReportModule { }
