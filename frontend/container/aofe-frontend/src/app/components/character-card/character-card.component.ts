import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private userService: UserService, private _snackBar: MatSnackBar) {}

  getDefenseScore = () =>
    this.character?.equipment
      .filter((e) => e.defense > 0)
      .map((e) => e.defense)
      .reduce((a, b) => a + b, 0);
  getAttackScore = () =>
    this.character?.equipment
      .filter((e) => e.damage > 0)
      .map((e) => e.damage)
      .reduce((a, b) => a + b, 0);

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

  // eye sore
  // #region
  equipItem(item: Item): void {
    if (this.character) {
      const mappedEquipmentBySlot = this.character.equipment.map((e) => e.slot);

      clearTimeout(this.timeoutId);

      // If there is no equiped item named as `item.name` AND the `item.slot` is "empty"
      if (mappedEquipmentBySlot.includes(item.slot)) {
        // If there is an item already equiped in the slot than we swap it to the
        // new item.

        const oldIndex = this.character.equipment
          .map((e) => e.slot)
          .indexOf(item.slot, 0);
        this.character.inventory.push(this.character.equipment[oldIndex]);
        this.character.equipment.splice(oldIndex, 1);
      } else if (item.slot === 'twohanded') {
        // If the new item is twohanded than we have to remove the main and offhand equipment

        const mainIndex = mappedEquipmentBySlot.indexOf('main', 0);
        const secondaryIndex = mappedEquipmentBySlot.indexOf('secondary', 0);

        // removing items from hand
        if (mainIndex > -1) {
          this.character.inventory.push(this.character.equipment[mainIndex]);
          this.character.equipment.splice(mainIndex, 1);
        }
        if (secondaryIndex > -1) {
          this.character.inventory.push(
            this.character.equipment[secondaryIndex]
          );
          this.character.equipment.splice(secondaryIndex, 1);
        }
      } else {
        // If there is no other item equipped in the desired slot, but we will chech if there is other blocking items
        // We can assume that this else branch will only handle the cases when the user wants to swap the twohanded items
        // for a main or secondary

        const twohandedIndex = mappedEquipmentBySlot.indexOf('twohanded', 0);

        if (twohandedIndex > -1) {
          this.character.inventory.push(
            this.character.equipment[twohandedIndex]
          );
          this.character.equipment.splice(twohandedIndex, 1);
        }
      }

      this.swapItems(item);
    }
  }
  // #endregion

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

  deleteItem(data: { event: any; item: Item }): void {
    console.log(data.event);
    data.event.preventDefault();
    if (this.character) {
      clearTimeout(this.timeoutId);
      const index = this.character.inventory.indexOf(data.item, 0);
      if (index > -1) {
        this.character.inventory.splice(index, 1);
        this._snackBar.open("Item deleted from the Inventory", "OK", {duration: 2000})
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

  private swapItems(item: Item): void {
    if (this.character) {
      const index = this.character.inventory.indexOf(item, 0);
      if (index > -1) {
        this.character.inventory.splice(index, 1);
        this.character.equipment.push(item);
        this.saveCharacter();
      }
    }
  }
}
