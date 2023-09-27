import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorcodeComponent } from './doctorcode.component';

describe('DoctorcodeComponent', () => {
  let component: DoctorcodeComponent;
  let fixture: ComponentFixture<DoctorcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
