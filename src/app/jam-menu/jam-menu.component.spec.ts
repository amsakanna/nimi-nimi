/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JamMenuComponent } from './jam-menu.component';

describe('JamMenuComponent', () => {
  let component: JamMenuComponent;
  let fixture: ComponentFixture<JamMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
