import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglogsComponent } from './reglogs.component';

describe('ReglogsComponent', () => {
  let component: ReglogsComponent;
  let fixture: ComponentFixture<ReglogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
