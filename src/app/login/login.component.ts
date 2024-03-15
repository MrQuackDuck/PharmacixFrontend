import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form : FormGroup;
  showError : boolean = false;

  constructor(private formBuilder : FormBuilder, private router : Router, private authService : AuthService, private loadingService : LoadingService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit() : void {
    this.loadingService.enableLoading();
    let formData = this.form.getRawValue();
    this.authService.login(formData.username, formData.password)
      .subscribe(() => this.router.navigate(['/admin']),
      error => {
        this.loadingService.disableLoading();
        this.showError = true;
      });
  }
}
