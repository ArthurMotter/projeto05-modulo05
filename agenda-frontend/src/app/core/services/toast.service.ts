import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastInfo[]>([]);
  toasts$: Observable<ToastInfo[]> = this.toastsSubject.asObservable();
  private toastId = 0;

  show(message: string, type: 'success' | 'danger' | 'info'): void {
    const newToast: ToastInfo = {
      id: this.toastId++,
      message,
      type
    };
    this.toastsSubject.next([...this.toastsSubject.getValue(), newToast]);
  }

  showSuccess(message: string): void {
    this.show(message, 'success');
  }

  showError(message: string): void {
    this.show(message, 'danger');
  }

  remove(toastToRemove: ToastInfo): void {
    const filteredToasts = this.toastsSubject.getValue().filter(toast => toast.id !== toastToRemove.id);
    this.toastsSubject.next(filteredToasts);
  }
}