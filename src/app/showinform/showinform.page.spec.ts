import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowinformPage } from './showinform.page';

describe('ShowinformPage', () => {
  let component: ShowinformPage;
  let fixture: ComponentFixture<ShowinformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowinformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowinformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
