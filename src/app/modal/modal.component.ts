import { Component, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'modal-window',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(private scrollService : ScrollService) { }

  @Input()
  showModal: boolean;

  @Input()
  noPadding : boolean;

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  scrollY : number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && changes['showModal'].currentValue === true) {
      this.onShowModal();
    }
  }

  onShowModal() {
    this.scrollService.disableScrolling();
  }

  close() {
    this.scrollService.enableScrolling();
    this.onClose.emit(false);
  }
}
