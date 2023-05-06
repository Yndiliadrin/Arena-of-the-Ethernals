import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NpcService } from 'src/app/services/npc.service';
import { Npc } from 'src/app/shared/types/user.type';
import { NpcFormDialogComponent } from '../npc-form-dialog/npc-form-dialog.component';

@Component({
  selector: 'app-npc-dialog',
  templateUrl: './npc-dialog.component.html',
  styleUrls: ['./npc-dialog.component.scss']
})
export class NpcDialogComponent {
  npcs: Array<Npc> = [];
  loading: boolean = true;
  isAdmin = false;

  constructor(private npcService: NpcService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
    this.isAdmin =
      JSON.parse(localStorage.getItem('userObject') || '{}')['accessLevel'] ===
      3;
  }

  deleteNpc(npc: Npc): void {
    this.npcService.deleteNpc(npc._id).subscribe((resp) => {
      resp.success && this.fetchData();
    });
  }

  editNpc(npc: Npc | null = null): void {
    const dialogRef = this.dialog.open(NpcFormDialogComponent, {
      data: npc,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.edit === undefined) return;

      if (data.edit) {
        this.npcService.updateNpc({_id: npc?._id, ...data.data}).subscribe((resp) => {
          resp && this.fetchData();
        });
      } else {
        this.npcService.createNpc(data.data).subscribe((resp) => {
          resp && this.fetchData();
        });
      }
    });
  }

  private fetchData() {
    this.loading = true;
    this.npcService.readNpcs().subscribe((data) => {
      this.npcs = data;
      this.loading = false;
    });
  }
}
