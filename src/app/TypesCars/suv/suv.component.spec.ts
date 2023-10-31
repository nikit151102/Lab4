import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuvComponent } from './suv.component';

describe('SuvComponent', () => {
  let component: SuvComponent;
  let fixture: ComponentFixture<SuvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuvComponent]
    });
    fixture = TestBed.createComponent(SuvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
