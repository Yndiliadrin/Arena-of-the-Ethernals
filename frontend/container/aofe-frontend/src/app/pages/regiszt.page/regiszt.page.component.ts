import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-regiszt.page',
  templateUrl: './regiszt.page.component.html',
  styleUrls: ['./regiszt.page.component.scss'],
})
export class RegisztPageComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'),
    ]),
    passwordAgain: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'),
    ]),
  });
  hide = true;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.userService
      .regiszt({
        username: this.form.value.username,
        password: this.form.value.password,
      })
      .subscribe(
        (res) => {
          this.router.navigate(['/login']);
        },
        (err) => {
          this.hide = false;
        }
      );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
