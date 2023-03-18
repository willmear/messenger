import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage='';

  form: any = {
    email: null,
    password: null
  };

  constructor(private authService: AuthService, private router: Router) {

  }


  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const {email, password} = this.form;

    this.authService.login(email, password).subscribe({next:data => {
      console.log(data);
      console.log(data.role);
      console.log(data.token);
      this.authService.setRoles(data.role);
      this.authService.setToken(data.token);

      if (data.role === 'USER') {
        this.router.navigate(['/home']);
      }
    },
    error:err => {
      this.errorMessage = err.error.message;
    }
  });

  }

  

  

}

