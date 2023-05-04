import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Character, Npc } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-arena-board',
  templateUrl: './arena-board.component.html',
  styleUrls: ['./arena-board.component.scss'],
})
export class ArenaBoardComponent implements OnInit {
  userCharacterList: Array<{ username: string; character: Character }> = [];
  npcCharacterList: Array<Npc> = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUserCharacters()
      .subscribe((data) => (this.userCharacterList = data));

    this.userService
      .getNpcCharacters()
      .subscribe((data) => (this.npcCharacterList = data));
  }
}
