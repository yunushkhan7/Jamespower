import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EOrderingComponent } from './e-ordering.component';

describe('EOrderingComponent', () => {
  let component: EOrderingComponent;
  let fixture: ComponentFixture<EOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EOrderingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
