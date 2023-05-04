import { Component, Input, OnInit } from '@angular/core';
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
  skillPoints: number = 0;

  propertyList: Array<string> = ['hp', 'strength', 'dexterity', 'intelligence'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userObject = localStorage.getItem('userObject');
    if (userObject) {
      this.username = JSON.parse(userObject || '{}')['username'];

      this.skillPoints = this.calculateFreeSkillPoints();
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
    if (this.character && this.skillPoints > 0) {
      clearTimeout(this.timeoutId);
      (this.character[
        key as keyof typeof this.character
      ] as unknown as number) += 1;
      this.skillPoints -= 1;
      this.saveCharacter();
    }
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

  saveCharacter(): void {
    this.timeoutId = setTimeout(() => {
      let user: User = JSON.parse(localStorage.getItem('userObject') || '{}');
      if (this.character) user.character = this.character;

      this.userService.updateCharacter(user).subscribe((newUser: User) => {
        localStorage.setItem('userObject', JSON.stringify(newUser));
        this.character = newUser.character;
      });
    }, 2000);
  }

  /**
   * We can calculate the free skill ponits amount, based on the level and the attributes
   *
   * The player gets 2 skillpoint every level, and starts with 13
   */
  private calculateFreeSkillPoints(): number {
    if (this.character) {
      const sumOfTheAttributes =
        this.character.hp +
        this.character.strength +
        this.character.dexterity +
        this.character.intelligence;
      const skillpointsBasedOnTheLevel = this.character.level * 2;
      const spentSkillpointsOnTopOfTheBase = sumOfTheAttributes - 13;

      if (skillpointsBasedOnTheLevel > spentSkillpointsOnTopOfTheBase)
        return skillpointsBasedOnTheLevel - spentSkillpointsOnTopOfTheBase;
    }
    return 0;
  }
}
