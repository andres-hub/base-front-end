import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionMenuComponent } from './construction-menu.component';

describe('ConstructionMenuComponent', () => {
  let component: ConstructionMenuComponent;
  let fixture: ComponentFixture<ConstructionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
