import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-misc-tab',
  templateUrl: './admin-misc-tab.component.html',
  styleUrls: ['./admin-misc-tab.component.css']
})
export class AdminMiscTabComponent {
  constructor(private authService : AuthService, private router : Router) { }
  
  logout() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
