import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './_service/auth.service';
import { TokenStorageService } from './_service/token-storage.service';
import { UserService } from './_service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private authService: AuthService) {}


  ngOnInit(): void {

    

  
  }

  public isLoggedIn() {
    return this.authService.isLoggedin();
  }

  public logout() {
    this.authService.clear()
  }



}
