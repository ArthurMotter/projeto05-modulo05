import { Routes } from '@angular/router';

export const routes: Routes = [
    // Root path (Home)
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    // Other paths
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'cadastros',
        loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule)
    },
    {
        path: 'agendamentos',
        loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule)
    }
];