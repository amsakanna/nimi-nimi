/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JamListComponent } from './jam-list.component';

describe('JamListComponent', () => {
  let component: JamListComponent;
  let fixture: ComponentFixture<JamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
