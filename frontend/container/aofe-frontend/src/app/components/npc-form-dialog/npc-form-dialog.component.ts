import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Npc } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-npc-form-dialog',
  templateUrl: './npc-form-dialog.component.html',
  styleUrls: ['./npc-form-dialog.component.scss'],
})
export class NpcFormDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    level: new FormControl(0, Validators.required),
    strength: new FormControl(0, Validators.required),
    dexterity: new FormControl(0, Validators.required),
    intelligence: new FormControl(0, Validators.required),
    exp: new FormControl(0, Validators.required),
    hp: new FormControl(0, Validators.required),
  });

  editing: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: Npc | null) {}

  ngOnInit(): void {
    if (this.data) {
      this.editing = true;
      this.setForm();
    }
  }

  private setForm() {
    this.form.patchValue({
      name: this.data?.name,
      level: this.data?.level,
      strength: this.data?.strength,
      dexterity: this.data?.dexterity,
      intelligence: this.data?.intelligence,
      exp: this.data?.exp,
      hp: this.data?.hp,
    });
  }
}
