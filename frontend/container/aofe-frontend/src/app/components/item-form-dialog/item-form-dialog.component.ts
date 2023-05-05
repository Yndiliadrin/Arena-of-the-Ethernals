import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-item-form-dialog',
  templateUrl: './item-form-dialog.component.html',
  styleUrls: ['./item-form-dialog.component.scss'],
})
export class ItemFormDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    slot: new FormControl('', Validators.required),
    defense: new FormControl(0, Validators.required),
    damage: new FormControl(0, Validators.required),
    rarity: new FormControl(1, Validators.required),
  });

  editing: boolean = false;
  slots: Array<string> = [
    'head',
    'chest',
    'foot',
    'main',
    'secondary',
    'twohanded',
  ];

  constructor(@Inject(MAT_DIALOG_DATA) private data: Item | null) {}

  ngOnInit(): void {
    if (this.data) {
      this.editing = true;
      this.setForm();
    }
  }

  private setForm() {
    this.form.patchValue({
      name: this.data?.name,
      slot: this.data?.slot,
      defense: this.data?.defense,
      damage: this.data?.damage,
      rarity: this.data?.rarity,
    });
  }
}
