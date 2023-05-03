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
  warnings: string[] = [];

  private passwordValidationVarning: string =
    'The password must be min. 8 character long, must contain a number, and capital letter!';
  private passwordMissmatch: string = 'The two password field must match!';

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
          this.warnings.push('Something went wrong');
        }
      );
  }

  checkPasswordfields() {
    const formData = this.form.value;
    if (
      formData.password !== formData.passwordAgain &&
      formData.password !== '' &&
      formData.passwordAgain !== ''
    ) {
      if (!this.warnings.includes(this.passwordMissmatch))
        this.warnings.push(this.passwordMissmatch);
    } else if (formData.password === formData.passwordAgain) {
      const index = this.warnings.indexOf(this.passwordMissmatch, 0);
      if (index > -1) {
        this.warnings.splice(index, 1);
      }
    }

    if (!this.form.get('password')?.valid) {
      if (!this.warnings.includes(this.passwordValidationVarning))
        this.warnings.push(this.passwordValidationVarning);
    } else {
      const index = this.warnings.indexOf(this.passwordValidationVarning, 0);
      if (index > -1) {
        this.warnings.splice(index, 1);
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
