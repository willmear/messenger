import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { User } from '../interface/user';
import { UserRoles } from '../enum/UserRoles.enum';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[];
  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null
  }

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {
    this.users = [];
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { firstname, lastname, email, password } = this.form;
 

      this.authService.register(String(firstname), String(lastname), String(email), String(password)).subscribe({next: data => {  
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


}
