import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReDevelopPage } from './re-develop.page';

describe('ReDevelopPage', () => {
  let component: ReDevelopPage;
  let fixture: ComponentFixture<ReDevelopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReDevelopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReDevelopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
