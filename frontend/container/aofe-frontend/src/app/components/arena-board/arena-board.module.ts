import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArenaBoardComponent } from './arena-board.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ArenaBoardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatRippleModule
  ],
  exports: [ArenaBoardComponent],
})
export class ArenaBoardModule {}
