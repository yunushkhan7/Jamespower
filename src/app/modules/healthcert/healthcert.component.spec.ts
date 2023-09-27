import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcertComponent } from './healthcert.component';

describe('HealthcertComponent', () => {
  let component: HealthcertComponent;
  let fixture: ComponentFixture<HealthcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthcertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
