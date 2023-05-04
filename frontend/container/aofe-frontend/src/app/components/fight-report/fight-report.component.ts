import { AfterViewInit, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FightService } from 'src/app/services/fight.service';
import { Character, Npc } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-fight-report',
  templateUrl: './fight-report.component.html',
  styleUrls: ['./fight-report.component.scss'],
})
export class FightReportComponent implements AfterViewInit {
  constructor(
    private fightService: FightService,
    public dialogRef: MatDialogRef<FightReportComponent>,

    @Inject(MAT_DIALOG_DATA)
    public oponent:
      | { username: string; character: Character; _id: string }
      | Npc
  ) {}

  ngAfterViewInit(): void {
    const me = JSON.parse(localStorage.getItem('userObject') || '{}');

    console.log(me, this.oponent);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
