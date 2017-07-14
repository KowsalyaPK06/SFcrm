import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayAllLeadsComponent } from './display-all-leads.component';
import { CreateLeadComponent } from './create-lead.component';
import { LeadDetailComponent } from './lead-detail.component';
import { WebToLeadComponent } from './web-to-lead.component';


const onboardRoutes: Routes = [
    { path: '', component: DisplayAllLeadsComponent },
    { path: 'createLead', component: CreateLeadComponent },
    { path: 'webtolead', component: WebToLeadComponent },
    { path: 'detail/:id', component: LeadDetailComponent }
];


export const onboardRouting: ModuleWithProviders = RouterModule.forChild(onboardRoutes);