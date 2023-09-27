import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniccodeComponent } from './cliniccode.component';

describe('CliniccodeComponent', () => {
  let component: CliniccodeComponent;
  let fixture: ComponentFixture<CliniccodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliniccodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CliniccodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
