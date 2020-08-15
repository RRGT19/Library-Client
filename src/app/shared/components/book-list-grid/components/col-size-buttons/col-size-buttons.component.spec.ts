import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColSizeButtonsComponent } from './col-size-buttons.component';

describe('ColSizeButtonsComponent', () => {
  let component: ColSizeButtonsComponent;
  let fixture: ComponentFixture<ColSizeButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColSizeButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColSizeButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
