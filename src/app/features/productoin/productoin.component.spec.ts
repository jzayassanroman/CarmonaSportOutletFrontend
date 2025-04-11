import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoinComponent } from './productoin.component';

describe('ProductoinComponent', () => {
  let component: ProductoinComponent;
  let fixture: ComponentFixture<ProductoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
