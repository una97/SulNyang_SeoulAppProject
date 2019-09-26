import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostlistPage } from './mypostlist.page';

describe('MypostlistPage', () => {
  let component: MypostlistPage;
  let fixture: ComponentFixture<MypostlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypostlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypostlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
