import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ModalComponent } from './components/modal/modal.component';
import { TimePipe } from './pipes/time.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';

@NgModule({
  declarations: [
    ModalComponent,
    NavbarComponent,
    ToastComponent,
    ToastContainerComponent
    // TimePipe
  ],
  imports: [
    CommonModule,
    //NgbModule,
    RouterModule,
    TimePipe
  ],
  exports: [
    ModalComponent,
    NavbarComponent,
    TimePipe,
    ToastComponent,
    ToastContainerComponent
  ]
    
})
export class SharedModule { }
