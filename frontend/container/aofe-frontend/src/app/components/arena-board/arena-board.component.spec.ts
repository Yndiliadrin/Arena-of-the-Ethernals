import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaBoardComponent } from './arena-board.component';

describe('ArenaBoardComponent', () => {
  let component: ArenaBoardComponent;
  let fixture: ComponentFixture<ArenaBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenaBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArenaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
