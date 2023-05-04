import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { Character } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-index.page',
  templateUrl: './index.page.component.html',
  styleUrls: ['./index.page.component.scss'],
})
export class IndexPageComponent implements OnInit {
  character: Character | null = null;
  isAdmin: boolean = false;
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.character = JSON.parse(localStorage.getItem('userObject') || '{}')[
      'character'
    ];

    this.isAdmin =
      JSON.parse(localStorage.getItem('userObject') || '').accessLevel === 3;
  }

  fightCallback(report: any): void {
    if ('exp' in report) {
      this.character!.exp += report.exp;
      if (report.loot) this.character!.inventory.push(report.loot);

      this.handleLevelUp();
    }
  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private handleLevelUp() {
    if (this.character!.exp > (this.character!.level + 1) * 12) {
      this.character!.exp = 0;
      this.character!.level += 1;
    }
  }
}
