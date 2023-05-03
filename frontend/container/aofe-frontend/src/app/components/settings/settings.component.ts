import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
      console.log(JSON.parse(localStorage.getItem("userObject") || "{}"));
  }
}
