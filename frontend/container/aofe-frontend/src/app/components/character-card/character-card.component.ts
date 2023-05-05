import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Character, Item, User } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  @Input()
  character: Character | null = null;
  username: string = '';
  private timeoutId: any;
  @Input() skillPoints: number = 0;
  @Output() selectPropertyCallback = new EventEmitter<string>();

  propertyList: Array<string> = ['hp', 'strength', 'dexterity', 'intelligence'];

  constructor(private userService: UserService) {}

  getDefenseScore = () => this.character?.equipment.filter(e=>e.defense>0).map(e=>e.defense).reduce((a,b)=>a+b,0);
  getAttackScore = () => this.character?.equipment.filter(e=>e.damage>0).map(e=>e.damage).reduce((a,b)=>a+b,0);

  ngOnInit(): void {
    const userObject = localStorage.getItem('userObject');
    if (userObject) {
      this.username = JSON.parse(userObject || '{}')['username'];
    }
  }

  getProperty(key: string): number {
    if (this.character)
      return this.character[
        key as keyof typeof this.character
      ] as unknown as number;
    return -1;
  }

  selectProperty(key: string): void {
    this.selectPropertyCallback.next(key);
  }

  getLevelProgress(): number {
    if (this.character)
      return (this.character?.exp / (this.character?.level + 1)) * 12;
    return 0;
  }

  equipItem(item: Item): void {
    if (this.character) {
      clearTimeout(this.timeoutId);
      const index = this.character.inventory.indexOf(item, 0);
      if (index > -1) {
        this.character.inventory.splice(index, 1);
        this.character.equipment.push(item);
        this.saveCharacter();
      }
    }
  }

  unEquipItem(item: Item): void {
    if (this.character) {
      clearTimeout(this.timeoutId);
      const index = this.character.equipment.indexOf(item, 0);
      if (index > -1) {
        this.character.equipment.splice(index, 1);
        this.character.inventory.push(item);
        this.saveCharacter();
      }
    }
  }

  private saveCharacter(): void {
    this.timeoutId = setTimeout(() => {
      let user: User = JSON.parse(localStorage.getItem('userObject') || '{}');
      if (this.character) user.character = this.character;

      this.userService.updateCharacter(user).subscribe((newUser: User) => {
        localStorage.setItem('userObject', JSON.stringify(newUser));
        this.character = newUser.character;
      });
    }, 2000);
  }
}
