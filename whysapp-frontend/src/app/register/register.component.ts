import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { UserRoles } from '../enum/UserRoles.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[];
  user: any;

  constructor(protected userService: UserService) {
    this.users = [];
  }

  ngOnInit(): void {

  }

  onUserCreate(user: { id: null, username: string, email: string, password: string, role: UserRoles.USER }) {
    this.userService.create(user).subscribe(res => {  
      console.log(res);
      this.ngOnInit();
    });
  }

}
