import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmgnotifyComponent } from './rmgnotify.component';

describe('RmgnotifyComponent', () => {
  let component: RmgnotifyComponent;
  let fixture: ComponentFixture<RmgnotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmgnotifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmgnotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
