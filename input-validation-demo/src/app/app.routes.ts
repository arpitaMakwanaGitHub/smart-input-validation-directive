import { Routes } from '@angular/router';
import { DemoForm } from './components/demo-form/demo-form';

export const routes: Routes = [
    { path: '', redirectTo: 'demo-form', pathMatch: 'full' },
    { path: 'demo-form', component: DemoForm },
    { path: '**', redirectTo: 'demo-form' }
];
