import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: Array<User> = [];
  loading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  deleteUser(user: User): void {
    this.userService
      .deleteUser(user._id)
      .subscribe((data) => this.fetchUsers());
  }

  private fetchUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.loading = false;
    });
  }
}
