import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinformPage } from './cinform.page';

describe('CinformPage', () => {
  let component: CinformPage;
  let fixture: ComponentFixture<CinformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
