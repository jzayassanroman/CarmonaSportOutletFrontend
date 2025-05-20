import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaAdministradorComponent } from './pantalla-administrador.component';

describe('PantallaAdministradorComponent', () => {
  let component: PantallaAdministradorComponent;
  let fixture: ComponentFixture<PantallaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
