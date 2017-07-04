import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { onboardRouting } from './onboarding.routing';

import { DisplayAllLeadsComponent } from './display-all-leads.component';
import { CreateLeadComponent } from './create-lead.component';
import { FileSelectDirective } from 'ng2-file-upload';

import { SampleComponent } from './sample.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        onboardRouting
    ],
    declarations: [
        DisplayAllLeadsComponent,
        CreateLeadComponent,
        FileSelectDirective,
        SampleComponent
    ]
})

export class OnboardingModule { }