import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSectionDialogComponent } from './board-section-dialog.component';

describe('BoardSectionDialogComponent', () => {
  let component: BoardSectionDialogComponent;
  let fixture: ComponentFixture<BoardSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardSectionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
