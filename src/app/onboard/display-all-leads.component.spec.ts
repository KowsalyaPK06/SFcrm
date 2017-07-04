import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllLeadsComponent } from './display-all-leads.component';

describe('DisplayAllLeadsComponent', () => {
  let component: DisplayAllLeadsComponent;
  let fixture: ComponentFixture<DisplayAllLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAllLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
