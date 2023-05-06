import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpcDialogComponent } from './npc-dialog.component';
import { NpcFormDialogModule } from '../npc-form-dialog/npc-form-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    NpcDialogComponent
  ],
  imports: [
    CommonModule,

    NpcFormDialogModule,

    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    NpcDialogComponent
  ]
})
export class NpcDialogModule { }
