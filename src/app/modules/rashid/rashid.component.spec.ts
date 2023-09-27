import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RashidComponent } from './rashid.component';

describe('RashidComponent', () => {
  let component: RashidComponent;
  let fixture: ComponentFixture<RashidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RashidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RashidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
