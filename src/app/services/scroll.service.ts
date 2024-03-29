import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private renderer: Renderer2;
  scrollY : number;
  
  constructor(rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enableScrolling() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    const body = document.body;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, -this.scrollY);
  }

  disableScrolling() {
    document.body.style.top = `-${window.scrollY}px`;
    this.scrollY = +document.body.style.top.slice(0, -2);
    this.renderer.addClass(document.body, 'disable-scroll');
  }
}
