import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastInfo, ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: false,
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent {
  toasts$: Observable<ToastInfo[]>;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }

  removeToast(toast: ToastInfo) {
    this.toastService.remove(toast);
  }
}