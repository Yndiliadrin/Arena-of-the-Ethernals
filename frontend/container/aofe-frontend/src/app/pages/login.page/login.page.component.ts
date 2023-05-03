import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login.page',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
    ]),
  });
  hide = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem("userObject");
      localStorage.removeItem('user');
      this.authService.logout().subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log
      );
    }
  }

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe(
      (res) => {
        localStorage.setItem("userObject", JSON.stringify(res));
        localStorage.setItem('user', this.form.get('username')?.value);
        this.router.navigate(["/index"]);
      },
      (err) => console.log(err)
    );
  }

  navigateToRegiszt() {
    this.router.navigate(["/regiszt"])
  }
}
