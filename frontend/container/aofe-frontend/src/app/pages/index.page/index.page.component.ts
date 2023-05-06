import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ItemsDialogComponent } from 'src/app/components/items-dialog/items-dialog.component';
import { NpcDialogComponent } from 'src/app/components/npc-dialog/npc-dialog.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { UserService } from 'src/app/services/user.service';
import { Character, User } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-index.page',
  templateUrl: './index.page.component.html',
  styleUrls: ['./index.page.component.scss'],
})
export class IndexPageComponent implements OnInit {
  public character: Character | null = null;
  public skillPoints: number = 0;
  public isAdmin: boolean = false;
  public username: string = '';
  private timeoutId: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.character = JSON.parse(localStorage.getItem('userObject') || '{}')[
      'character'
    ];

    if (this.character) this.skillPoints = this.calculateFreeSkillPoints();

    this.isAdmin =
      JSON.parse(localStorage.getItem('userObject') || '').accessLevel === 3;
    this.username = JSON.parse(
      localStorage.getItem('userObject') || '{}'
    ).username;
  }

  fightCallback(report: any): void {
    clearTimeout(this.timeoutId);
    if ('exp' in report) {
      this.character!.exp += report.exp;
      if (report.loot) this.character!.inventory.push(report.loot);

      this.handleLevelUp();

      this.timeoutId = setTimeout(() => {
        let tmpUserObject: User = JSON.parse(
          localStorage.getItem('userObject') || '{}'
        );

        if (JSON.stringify(tmpUserObject) === '{}' || !this.character) return;

        tmpUserObject!.character = this.character as Character;

        this.userService.updateCharacter(tmpUserObject).subscribe((data) => {
          localStorage.setItem('userObject', JSON.stringify(data));
        });
      }, 2500);
    }
  }

  selectPropertyCallback(key: string): void {
    if (this.character && this.skillPoints > 0) {
      clearTimeout(this.timeoutId);
      (this.character[
        key as keyof typeof this.character
      ] as unknown as number) += 1;
      this.skillPoints -= 1;
      this.saveCharacter();
    }
  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateCharacter(result).subscribe((newUser: User) => {
          localStorage.setItem('userObject', JSON.stringify(newUser));
          this.username = newUser.username;
        });
      }
    });
  }

  openItemsDialog(): void {
    const dialogRef = this.dialog.open(ItemsDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openNpcDialog(): void {
    const dialogRef = this.dialog.open(NpcDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {});}

  openDashboardDialog(): void {
    const dialogRef = this.dialog.open(DashboardComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private handleLevelUp() {
    if (this.character!.exp > (this.character!.level + 1) * 12) {
      this.character!.exp = 0;
      this.character!.level += 1;
      this.skillPoints = this.calculateFreeSkillPoints();
    }
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
