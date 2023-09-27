import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataRetentionComponent } from './data-retention.component';


describe('ManagestandComponent', () => {
  let component: DataRetentionComponent;
  let fixture: ComponentFixture<DataRetentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRetentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRetentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
