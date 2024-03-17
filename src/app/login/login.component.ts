import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { LanguageService } from '../services/language.service';
import { Language } from '../models/language';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form : FormGroup;
  showError : boolean = false;

  constructor(private formBuilder : FormBuilder, private router : Router, private authService : AuthService, private loadingService : LoadingService, private languageService : LanguageService) { }

  Language = Language;
  currentLanguage : Language = Language.UK;

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });

    this.currentLanguage = this.languageService.getLanguage();
  }

  setLanguage(lang : Language) {
    this.languageService.setLanguage(lang);
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
