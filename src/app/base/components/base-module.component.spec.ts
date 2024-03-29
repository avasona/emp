import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModuleComponent } from './base-module.component';

describe('BaseModuleComponent', () => {
  let component: BaseModuleComponent;
  let fixture: ComponentFixture<BaseModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
