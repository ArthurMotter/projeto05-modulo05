import { Component, ElementRef, Input, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() id = '';
  @Input() title = 'Modal Title';

  @ViewChild('modalElement') modalElement!: ElementRef;

  private bsModal: any;

  // Methods
  ngAfterViewInit() {
    this.bsModal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  // Handlers
  open() {
    this.bsModal.show();
  }

  close() {
    this.bsModal.hide();
  }
}