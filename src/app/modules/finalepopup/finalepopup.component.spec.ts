import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalepopupComponent } from './finalepopup.component';

describe('FinalepopupComponent', () => {
  let component: FinalepopupComponent;
  let fixture: ComponentFixture<FinalepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalepopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
