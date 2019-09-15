import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaListPage } from './idea-list.page';

describe('IdeaListPage', () => {
  let component: IdeaListPage;
  let fixture: ComponentFixture<IdeaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
