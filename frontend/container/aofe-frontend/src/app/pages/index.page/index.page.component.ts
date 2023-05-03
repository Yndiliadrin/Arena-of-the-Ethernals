import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { SettingsComponent } from 'src/app/components/settings/settings.component';

@Component({
  selector: 'app-index.page',
  templateUrl: './index.page.component.html',
  styleUrls: ['./index.page.component.scss'],
})
export class IndexPageComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {

  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(): void {
    this.router.navigate(["/login"])
  }
}
