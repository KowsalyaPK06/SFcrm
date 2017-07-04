import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayAllLeadsComponent } from './display-all-leads.component';
import { CreateLeadComponent } from './create-lead.component';


import { SampleComponent } from './sample.component';


const onboardRoutes: Routes = [
    { path: '', component: SampleComponent },
    // { path: '', component: DisplayAllLeadsComponent },
    { path: 'createLead', component: CreateLeadComponent }
];

//   {
//     path: 'heroes',
//     component: HeroListComponent,
//     data: { title: 'Heroes List' }
//   },


export const onboardRouting: ModuleWithProviders = RouterModule.forChild(onboardRoutes);