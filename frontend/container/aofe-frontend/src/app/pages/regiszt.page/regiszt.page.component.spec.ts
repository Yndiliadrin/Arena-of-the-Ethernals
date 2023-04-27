import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisztPageComponent } from './regiszt.page.component';

describe('RegisztPageComponent', () => {
  let component: RegisztPageComponent;
  let fixture: ComponentFixture<RegisztPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisztPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisztPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
