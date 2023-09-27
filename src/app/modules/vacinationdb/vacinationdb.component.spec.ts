import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinationdbComponent } from './vacinationdb.component';

describe('VacinationdbComponent', () => {
  let component: VacinationdbComponent;
  let fixture: ComponentFixture<VacinationdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinationdbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinationdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
