import { Component } from '@angular/core';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aofe-frontend';

  constructor(private testService: TestService){}

  onClick() {
    console.log("Shit is happening")
    this.testService.getServerStatus();
  }
}
