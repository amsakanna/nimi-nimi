/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JamFormComponent } from './jam-form.component';

describe('JamFormComponent', () => {
  let component: JamFormComponent;
  let fixture: ComponentFixture<JamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
