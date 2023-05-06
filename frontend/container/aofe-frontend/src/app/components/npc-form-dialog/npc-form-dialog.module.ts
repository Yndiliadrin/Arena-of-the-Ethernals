import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpcFormDialogComponent } from './npc-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [NpcFormDialogComponent],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [NpcFormDialogComponent],
})
export class NpcFormDialogModule {}
