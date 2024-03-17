import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from '../services/translator.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translatorService : TranslatorService) { }

  transform(value: string, ...params): string {
    return this.translatorService.translate(value, ...params);
  }
}
