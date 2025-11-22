import { Component, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';

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
  @Input() confirmButtonText = 'Confirmar'; 
  @Input() cancelButtonText = 'Cancelar';   

  // OUTPUTS
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  @ViewChild('modalElement') modalElement!: ElementRef;
  private bsModal: any;

  ngAfterViewInit() {
    this.bsModal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  open() {
    this.bsModal.show();
  }

  close() {
    this.bsModal.hide();
  }

  // HANDLERS
  handleConfirm() {
    this.onConfirm.emit();
    this.close();
  }

  handleCancel() {
    this.onCancel.emit();
    this.close();
  }
}