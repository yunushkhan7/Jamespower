import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatecertificateComponent } from './validatecertificate.component';

describe('ValidatecertificateComponent', () => {
  let component: ValidatecertificateComponent;
  let fixture: ComponentFixture<ValidatecertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatecertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatecertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
