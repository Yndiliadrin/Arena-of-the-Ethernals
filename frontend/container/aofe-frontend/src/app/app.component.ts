import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'aofe-frontend';

  constructor() {}

  onClick() {
    console.log('Shit is happening');
  }
}
