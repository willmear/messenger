import { Component } from '@angular/core';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userServices: UserService) {}
  
  ngOnInit(): void {

  }

  

}

