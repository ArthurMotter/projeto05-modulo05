import { Location } from '@angular/common';
import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from "./maintenance-routing.module";
import { AppModule } from 'src/app/app.module';
import { AppComponent } from 'src/app/app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('Maintenance Routing and Load Components', () => {

  let router: Router;
  let location: Location;
  let fixture: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
          RouterTestingModule.withRoutes(routes),
          AppModule,
          HttpClientTestingModule
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should navigate to "/area"', fakeAsync(() => {
      router.navigate(["/area"]).then(()=> {
          expect(location.path()).toBe("/area");
      });
  }));

  it('should navigate to "/professional"', fakeAsync(() => {
    router.navigate(["/professional"]).then(() => {
      expect(location.path()).toBe("/professional");
    });
  }));

  it('should navigate to "/appointment-type"', fakeAsync(() => {
    router.navigate(["/appointment-type"]).then(() => {
      expect(location.path()).toBe("/appointment-type");
    });
  }));

  it('should navigate to "/clients-table"', fakeAsync(() => {
    router.navigate(["/clients-table"]).then(() => {
      expect(location.path()).toBe("/clients-table");
    });
  }));

  it('should navigate to "/client-form"', fakeAsync(() => {
    router.navigate(["/client-form"]).then(() => {
      expect(location.path()).toBe("/client-form");
    });
  }));

  it('should navigate to "/client-form/{id}"', fakeAsync(() => {
    router.navigate(["/client-form/1"]).then(() => {
      expect(location.path()).toBe("/client-form/1");
    });
    flush();
    router.navigate(["/client-form/2"]).then(() => {
      expect(location.path()).toBe("/client-form/2");
    });
    flush();
    router.navigate(["/client-form/3"]).then(() => {
      expect(location.path()).toBe("/client-form/3");
    });

  }));

  it('should navigate to "/user"', fakeAsync(() => {
    router.navigate(["/user"]).then(() => {
      expect(location.path()).toBe("/user");
    });
  }));


  it('should navigate to "/area and load AreaPageComponent"', fakeAsync(() => {
    router.navigate(["/area"]).then(() => {
      expect(location.path()).toBe("/area");
      fixture.detectChanges();
      const areaPageComponent = fixture.debugElement.nativeElement.querySelector('app-area-page');
      expect(areaPageComponent).toBeTruthy();
    });
  }));


  it('should navigate to "/professional" and load ProfessioanalPageComponent', fakeAsync(() => {
    router.navigate(["/professional"]).then(() => {
      expect(location.path()).toBe("/professional");
      fixture.detectChanges();
      const professionalPageComponent = fixture.debugElement.nativeElement.querySelector('app-professional-page');
      expect(professionalPageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/appointment-type" and load AppointmentTypePageComponent', fakeAsync(() => {
    router.navigate(["/appointment-type"]).then(() => {
      expect(location.path()).toBe("/appointment-type");
      fixture.detectChanges();
      const appointmentTypePageComponent = fixture.debugElement.nativeElement.querySelector('app-appointment-type-page');
      expect(appointmentTypePageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/clients-table" and load ClientsTablePageComponent', fakeAsync(() => {
    router.navigate(["/clients-table"]).then(() => {
      expect(location.path()).toBe("/clients-table");
      fixture.detectChanges();
      const clientsTablePageComponent = fixture.debugElement.nativeElement.querySelector('app-clients-table-page');
      expect(clientsTablePageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/client-form" and load ClientFormPageComponent', fakeAsync(() => {
    router.navigate(["/client-form"]).then(() => {
      expect(location.path()).toBe("/client-form");
      fixture.detectChanges();
      const clientFormPageComponent = fixture.debugElement.nativeElement.querySelector('app-client-form-page');
      expect(clientFormPageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/client-form/{id}" and load ClientFormPageComponent', fakeAsync(() => {
    router.navigate(["/client-form/1"]).then(() => {
      expect(location.path()).toBe("/client-form/1");
      fixture.detectChanges();
      const clientFormPageComponent = fixture.debugElement.nativeElement.querySelector('app-client-form-page');
      expect(clientFormPageComponent).toBeTruthy();
    });
  }));

  it('should navigate to "/user" and load UserPageComponent', fakeAsync(() => {
    router.navigate(["/user"]).then(() => {
      expect(location.path()).toBe("/user");
      fixture.detectChanges();
      const userPageComponent = fixture.debugElement.nativeElement.querySelector('app-user-page');
      expect(userPageComponent).toBeTruthy();
    });
  }));



});
