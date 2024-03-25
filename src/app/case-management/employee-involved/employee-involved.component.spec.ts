import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInvolvedComponent } from './employee-involved.component';

describe('EmployeeInvolvedComponent', () => {
  let component: EmployeeInvolvedComponent;
  let fixture: ComponentFixture<EmployeeInvolvedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeInvolvedComponent]
    });
    fixture = TestBed.createComponent(EmployeeInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
