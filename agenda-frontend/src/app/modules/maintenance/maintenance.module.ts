import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { AreaPageComponent } from './pages/area-page/area-page.component';
import { ProfessionalPageComponent } from './pages/professional-page/professional-page.component';
import { AppointmentTypePageComponent } from './pages/appointment-type-page/appointment-type-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';

import { ProfessionalFormComponent } from './components/professional-form/professional-form.component';
import { ProfessionalListComponent } from './components/professional-list/professional-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientListComponent } from './components/client-list/client-list.component';


@NgModule({
  declarations: [
    AppointmentTypePageComponent,
    AreaPageComponent,
    ProfessionalPageComponent,
    UserPageComponent,
    ClientPageComponent,
    ProfessionalFormComponent,
    ProfessionalListComponent,
    ClientFormComponent,
    ClientListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaintenanceRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class MaintenanceModule { }