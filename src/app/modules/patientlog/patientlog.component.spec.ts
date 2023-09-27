import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlogComponent } from './patientlog.component';

describe('PatientlogComponent', () => {
  let component: PatientlogComponent;
  let fixture: ComponentFixture<PatientlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
