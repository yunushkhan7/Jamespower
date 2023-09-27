import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparedataComponent } from './comparedata.component';

describe('ComparedataComponent', () => {
  let component: ComparedataComponent;
  let fixture: ComponentFixture<ComparedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
