import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemlogComponent } from './systemlog.component';


describe('OperatorComponent', () => {
  let component: SystemlogComponent;
  let fixture: ComponentFixture<SystemlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
