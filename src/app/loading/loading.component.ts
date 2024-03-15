import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(private loadingService : LoadingService) {}

  isLoading() : boolean {
    return this.loadingService.isLoading();
  }
}
