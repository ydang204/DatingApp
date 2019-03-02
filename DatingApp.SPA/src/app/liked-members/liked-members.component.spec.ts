/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LikedMembersComponent } from './liked-members.component';

describe('LikedMembersComponent', () => {
  let component: LikedMembersComponent;
  let fixture: ComponentFixture<LikedMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
