import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetahomeComponent } from './tarjetahome.component';

describe('TarjetahomeComponent', () => {
  let component: TarjetahomeComponent;
  let fixture: ComponentFixture<TarjetahomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetahomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetahomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
