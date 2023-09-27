import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewdriverComponent } from './event.component';


describe('ManagepriceComponent', () => {
  let component: ViewdriverComponent;
  let fixture: ComponentFixture<ViewdriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
