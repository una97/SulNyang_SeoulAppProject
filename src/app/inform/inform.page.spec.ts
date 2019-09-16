import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformPage } from './inform.page';

describe('InformPage', () => {
  let component: InformPage;
  let fixture: ComponentFixture<InformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
