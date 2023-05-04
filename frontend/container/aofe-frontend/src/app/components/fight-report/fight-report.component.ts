import { AfterViewInit, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FightService } from 'src/app/services/fight.service';
import { fightReport } from 'src/app/shared/types/report.type';
import { Character, Npc } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-fight-report',
  templateUrl: './fight-report.component.html',
  styleUrls: ['./fight-report.component.scss'],
})
export class FightReportComponent implements AfterViewInit {
  loading: boolean = true;
  report: Array<fightReport> = [];
  me: string = '';
  spoilsOfWar = new Object();

  constructor(
    private fightService: FightService,
    public dialogRef: MatDialogRef<FightReportComponent>,

    @Inject(MAT_DIALOG_DATA)
    public oponent:
      | { username: string; character: Character; _id: string }
      | Npc
  ) {}

  ngAfterViewInit(): void {
    this.me = JSON.parse(localStorage.getItem('userObject') || '{}')._id;

    this.fightService
      .fight({ attacker: this.me, defender: this.oponent._id })
      .subscribe((data) => {
        this.report = data;
        this.loading = false;

        this.evaulateMatch();
      });
  }

  private evaulateMatch() {
    if (this.report.at(-1)!.winner === this.me) {
      this.spoilsOfWar = {
        exp:
          'name' in this.oponent
            ? this.oponent.exp
            : this.oponent.character.exp,
        loot: this.report[this.report.length - 1].loot,
      };
    }
  }
}
