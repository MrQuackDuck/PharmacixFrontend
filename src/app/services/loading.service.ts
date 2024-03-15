import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public showLoading : boolean;

  private renderer: Renderer2;
  
  constructor(rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enableLoading() {
    this.renderer.addClass(document.querySelector('.router-outlet-container'), 'hidden');
    this.showLoading = true;
  }

  disableLoading() {
    this.renderer.removeClass(document.querySelector('.router-outlet-container'), 'hidden');
    this.showLoading = false;
  }

  isLoading() : boolean {
    return this.showLoading;
  }
}
