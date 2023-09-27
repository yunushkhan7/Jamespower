import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccridifycertificateComponent } from './accridifycertificate.component';

describe('AccridifycertificateComponent', () => {
  let component: AccridifycertificateComponent;
  let fixture: ComponentFixture<AccridifycertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccridifycertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccridifycertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
