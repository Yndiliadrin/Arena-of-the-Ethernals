import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcFormDialogComponent } from './npc-form-dialog.component';

describe('NpcFormDialogComponent', () => {
  let component: NpcFormDialogComponent;
  let fixture: ComponentFixture<NpcFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpcFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpcFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
