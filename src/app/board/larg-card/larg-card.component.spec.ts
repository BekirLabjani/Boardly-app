import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargCardComponent } from './larg-card.component';

describe('LargCardComponent', () => {
  let component: LargCardComponent;
  let fixture: ComponentFixture<LargCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
