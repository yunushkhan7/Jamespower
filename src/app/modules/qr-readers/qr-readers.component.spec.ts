import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrReadersComponent } from './qr-readers.component';

describe('QrReadersComponent', () => {
  let component: QrReadersComponent;
  let fixture: ComponentFixture<QrReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrReadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
