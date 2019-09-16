import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPage } from './hospital.page';

describe('HospitalPage', () => {
  let component: HospitalPage;
  let fixture: ComponentFixture<HospitalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
