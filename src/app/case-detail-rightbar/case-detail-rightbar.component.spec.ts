import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetailRightbarComponent } from './case-detail-rightbar.component';

describe('CaseDetailRightbarComponent', () => {
  let component: CaseDetailRightbarComponent;
  let fixture: ComponentFixture<CaseDetailRightbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseDetailRightbarComponent]
    });
    fixture = TestBed.createComponent(CaseDetailRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
