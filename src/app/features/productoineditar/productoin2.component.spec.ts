import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productoin2Component } from './productoin2.component';

describe('Productoin2Component', () => {
  let component: Productoin2Component;
  let fixture: ComponentFixture<Productoin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productoin2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productoin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
