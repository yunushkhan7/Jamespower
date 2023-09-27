import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelPasswordComponent } from './excel-password.component';

describe('ExcelPasswordComponent', () => {
  let component: ExcelPasswordComponent;
  let fixture: ComponentFixture<ExcelPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
