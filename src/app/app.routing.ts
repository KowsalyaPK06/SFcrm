import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NoComponentFound } from './not-found.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/onboard', pathMatch: 'full' },
    { path: 'onboard', loadChildren: 'app/onboard/onboarding.module#OnboardingModule' }
    // { path: '**', redirectTo: '/404', pathMatch: 'full' },
    // { path: '404', component: NoComponentFound }
];


export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);