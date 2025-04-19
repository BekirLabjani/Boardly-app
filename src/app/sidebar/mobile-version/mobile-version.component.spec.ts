import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVersionComponent } from './mobile-version.component';

describe('MobileVersionComponent', () => {
  let component: MobileVersionComponent;
  let fixture: ComponentFixture<MobileVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileVersionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
