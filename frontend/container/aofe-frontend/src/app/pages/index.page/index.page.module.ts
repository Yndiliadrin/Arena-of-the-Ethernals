import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index.page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsModule } from 'src/app/components/settings/settings.module';
@NgModule({
  declarations: [IndexPageComponent],
  imports: [
    CommonModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    SettingsModule
  ],
})
export class IndexPageModule {}
