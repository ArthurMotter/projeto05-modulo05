import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './schedule-routing.module'; 
import { ScheduleModule } from './schedule.module';
import { Component } from '@angular/core';

@Component({ 
  template: '',
  standalone: true 
})
class DummyComponent {}

describe('ScheduleRoutingModule', () => {
  let router: Router;
  let location: Location;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ScheduleModule,
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent },
          ...routes
        ]),
        DummyComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(DummyComponent);
    router.initialNavigation();
  });

  it('should navigate to "/agendar" and load CreateAppointmentPageComponent', fakeAsync(() => {
    router.navigate(['/agendar']);
    
    tick();

    expect(location.path()).toBe('/agendar');
  }));
  
});