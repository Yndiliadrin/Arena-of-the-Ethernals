import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FightReportComponent } from './fight-report.component';



@NgModule({
  declarations: [
    FightReportComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FightReportComponent]
})
export class FightReportModule { }
