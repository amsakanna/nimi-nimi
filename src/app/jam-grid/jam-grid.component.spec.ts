/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JamGridComponent } from './jam-grid.component';

describe('JamGridComponent', () => {
  let component: JamGridComponent;
  let fixture: ComponentFixture<JamGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
