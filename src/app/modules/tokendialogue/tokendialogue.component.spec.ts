import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokendialogueComponent } from './tokendialogue.component';

describe('TokendialogueComponent', () => {
  let component: TokendialogueComponent;
  let fixture: ComponentFixture<TokendialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokendialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokendialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
