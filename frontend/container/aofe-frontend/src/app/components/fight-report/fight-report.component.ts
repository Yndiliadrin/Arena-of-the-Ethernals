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
  spoilsOfWar: any = new Object();

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


  // Ez a két függvény is egy kibaszott szégyen
  // #region
  evaulateRoundForUser(round:fightReport): string {
    if (round.atk !== this.me && round.winner !== this.me)
      return `[ HIT! ] -${round.dmg} HP`;
    else if (round.atk !== this.me && round.winner === this.me)
      return `[ MISSED! ]`

    return "";
  }

  evaulateRoundForOponent(round:fightReport): string {
    if (round.atk !== this.oponent._id && round.winner !== this.oponent._id)
      return `-${round.dmg} HP [ HIT! ]`;
    else if (round.atk !== this.oponent._id && round.winner === this.oponent._id)
      return `[ MISSED! ]`

    return "";
  }
  // #endregion

  private evaulateMatch() {
    if (this.report.at(-1)!.winner === this.me) {
      this.spoilsOfWar = {
        exp:
          'name' in this.oponent
            ? this.oponent.exp
            : this.oponent.character.level * 10 + 5,
        loot: this.report[this.report.length - 1].loot,
      };
    }
  }
}
