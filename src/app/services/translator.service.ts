import { Injectable } from '@angular/core';
import * as localization from '../../localization.json';
import { LanguageService } from './language.service';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  constructor(private languageService : LanguageService) { }

  localization : any = localization;
  currentLanguage : string;

  translate(value: string, ...params): string {
    this.currentLanguage = Language[this.languageService.getLanguage()] ?? 'EN';

    // Getting the result depending on selected language
    // For example: 'USERNAME' with English language selected
    // will return 'Username' from our JSON
    let result : string = this.localization.Localization[this.currentLanguage][value];

    // Interpolating the string with given parameters
    // "Hello, {0}" -> "Hello, Ivan" if zero argument was "Ivan"
    for (let i = 0; i < params.length; i++) {
        result = result.replaceAll(`{${i}}`, params[i]);
    }

    return result;
  }
}
