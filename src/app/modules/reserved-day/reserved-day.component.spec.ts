import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedDayComponent } from './reserved-day.component';

describe('ReservedDayComponent', () => {
  let component: ReservedDayComponent;
  let fixture: ComponentFixture<ReservedDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
