import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/types/user.type';
import { ItemFormDialogComponent } from '../item-form-dialog/item-form-dialog.component';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.scss'],
})
export class ItemsDialogComponent implements OnInit {
  items: Array<Item> = [];
  loading: boolean = true;
  isAdmin = false;

  constructor(private itemService: ItemsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
    this.isAdmin =
      JSON.parse(localStorage.getItem('userObject') || '{}')['accessLevel'] ===
      3;
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item._id).subscribe((resp) => {
      resp.success && this.fetchData();
    });
  }

  editItem(item: Item | null = null): void {
    const dialogRef = this.dialog.open(ItemFormDialogComponent, {
      data: item,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.edit === undefined) return;

      if (data.edit) {
        this.itemService
          .updateItem({ _id: item?._id, ...data.data })
          .subscribe((resp) => {
            resp && this.fetchData();
          });
      } else {
        this.itemService.createItem(data.data).subscribe((resp) => {
          resp && this.fetchData();
        });
      }
    });
  }

  private fetchData() {
    this.loading = true;
    this.itemService.requestItems().subscribe((data) => {
      this.items = data;
      this.loading = false;
    });
  }
}
