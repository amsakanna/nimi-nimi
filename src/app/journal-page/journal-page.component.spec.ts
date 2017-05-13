/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JournalPageComponent } from './journal-page.component';

describe('JournalPageComponent', () => {
  let component: JournalPageComponent;
  let fixture: ComponentFixture<JournalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
