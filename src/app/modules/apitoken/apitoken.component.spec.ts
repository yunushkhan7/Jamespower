import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApitokenComponent } from './apitoken.component';

describe('ApitokenComponent', () => {
  let component: ApitokenComponent;
  let fixture: ComponentFixture<ApitokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApitokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApitokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
