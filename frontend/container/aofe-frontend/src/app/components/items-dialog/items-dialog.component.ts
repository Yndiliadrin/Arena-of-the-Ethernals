import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.scss'],
})
export class ItemsDialogComponent implements OnInit {
  items: Array<Item> = [];
  loading: boolean = true;
  isAdmin = false;

  constructor(private itemService: ItemsService) {}

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

  editItem(item: Item): void {}

  openItemFormDialog(): void {}

  private fetchData() {
    this.loading = true;
    this.itemService.requestItems().subscribe((data) => {
      this.items = data;
      this.loading = false;
    });
  }
}
