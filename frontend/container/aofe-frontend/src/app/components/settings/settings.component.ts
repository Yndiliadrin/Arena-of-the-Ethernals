import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User | null = null;
  hide: boolean = true;
  validity: boolean = true;

  newPassword: string = '';

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userObject') || '{}');
  }

  updatePassword() {
    this.user!.password = this.newPassword;
  }

  //lusta vagyok rendesen megcsinálni a jelszó változtatást, érd be egy sima input mezővel, sry... :/
}
