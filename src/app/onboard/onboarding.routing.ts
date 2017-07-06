import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayAllLeadsComponent } from './display-all-leads.component';
import { CreateLeadComponent } from './create-lead.component';


const onboardRoutes: Routes = [
    { path: '', component: DisplayAllLeadsComponent },
    { path: 'createLead', component: CreateLeadComponent }
];


export const onboardRouting: ModuleWithProviders = RouterModule.forChild(onboardRoutes);