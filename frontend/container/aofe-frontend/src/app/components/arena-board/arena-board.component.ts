import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Character, Npc } from 'src/app/shared/types/user.type';
import { FightReportComponent } from '../fight-report/fight-report.component';

@Component({
  selector: 'app-arena-board',
  templateUrl: './arena-board.component.html',
  styleUrls: ['./arena-board.component.scss'],
})
export class ArenaBoardComponent implements OnInit {
  @Output() figthReportCallback = new EventEmitter<Object>();
  userCharacterList: Array<{
    username: string;
    character: Character;
    _id: string;
  }> = [];
  npcCharacterList: Array<Npc> = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService
      .getUserCharacters()
      .subscribe((data) => (this.userCharacterList = data));

    this.userService
      .getNpcCharacters()
      .subscribe((data) => (this.npcCharacterList = data));
  }

  openFightDialog(
    c: { username: string; character: Character; _id: string } | Npc
  ): void {
    const dialogRef = this.dialog.open(FightReportComponent, {
      data: c,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.figthReportCallback.next(result);
    });
  }
}
