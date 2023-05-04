import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightReportComponent } from './fight-report.component';

describe('FightReportComponent', () => {
  let component: FightReportComponent;
  let fixture: ComponentFixture<FightReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
