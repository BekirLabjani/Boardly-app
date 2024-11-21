import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskdialogComponent } from './addtaskdialog.component';

describe('AddtaskdialogComponent', () => {
  let component: AddtaskdialogComponent;
  let fixture: ComponentFixture<AddtaskdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtaskdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtaskdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
