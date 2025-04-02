import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroclienteComponent } from './registrocliente.component';

describe('RegistroclienteComponent', () => {
  let component: RegistroclienteComponent;
  let fixture: ComponentFixture<RegistroclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroclienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
