import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index.page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsModule } from 'src/app/components/settings/settings.module';
import { CharacterCardModule } from 'src/app/components/character-card/character-card.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { ArenaBoardModule } from 'src/app/components/arena-board/arena-board.module';
import { DashboardModule } from 'src/app/components/dashboard/dashboard.module';
import { ItemsDialogModule } from 'src/app/components/items-dialog/items-dialog.module';
import { NpcDialogModule } from 'src/app/components/npc-dialog/npc-dialog.module';

@NgModule({
  declarations: [IndexPageComponent],
  imports: [
    CommonModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,

    SettingsModule,
    CharacterCardModule,
    ArenaBoardModule,
    DashboardModule,
    ItemsDialogModule,
    NpcDialogModule
  ],
})
export class IndexPageModule {}
