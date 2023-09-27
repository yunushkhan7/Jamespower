import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtdplusxComponent } from './artdplusx.component';

describe('ArtdplusxComponent', () => {
  let component: ArtdplusxComponent;
  let fixture: ComponentFixture<ArtdplusxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtdplusxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtdplusxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
