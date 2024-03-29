import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../models/language';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private cookieService : CookieService, private location : Location,
    private router : Router) { }

  setLanguage(language : Language) {
    // Removing old cookies
    this.cookieService.deleteAll('language');

    // Setting the cookie
    let daysUntilExpiration = 30;
    this.cookieService.set('language', language.toString(), daysUntilExpiration, '/');

    // Updating the page
    let path = this.location.path();    
    this.router.navigateByUrl(path).then(() => window.location.reload());
  }

  getLanguage() : any { 
    let language = this.cookieService.get('language');
    if (language === '') return 'EN';
    return language;
  }
}