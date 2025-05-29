import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../modelos/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize, catchError, Subject, takeUntil, EMPTY } from 'rxjs';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  clienteId!: number;
  cargando = false;
  enviando = false;
  errorMensaje = '';
  private destroy$ = new Subject<void>();
  private formChanged = false;

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarDatosCliente();
  }

  inicializarFormulario(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      direccion: [''],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{9,15}')]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      provincia: ['', [Validators.required]]
    });
  }

  cargarDatosCliente(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.clienteId = userId;
      this.cargando = true;
      this.errorMensaje = '';

      this.clienteService.getClienteById(userId)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.cargando = false),
          catchError(err => {
            this.errorMensaje = 'Error al cargar los datos del cliente. Por favor, intente nuevamente.';
            console.error('Error al cargar cliente:', err);
            return EMPTY;
          })
        )
        .subscribe((cliente) => {
          this.clienteForm.patchValue({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            correoElectronico: cliente.email,
            direccion: cliente.direccion || '',
            telefono: cliente.telefono,
            nombreUsuario: cliente.usuario?.username || '',
            provincia: cliente.provincia || ''
          });
          this.formChanged = false;
        });
    } else {
      this.errorMensaje = 'No se pudo identificar al usuario. Por favor, inicie sesión nuevamente.';
    }
  }

  guardarCambios(): void {
    if (this.clienteForm.valid && !this.enviando) {
      const formValue = this.clienteForm.value;
      this.enviando = true;
      this.errorMensaje = '';

      const clienteActualizado: Cliente = {
        id: this.clienteId,
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        email: formValue.correoElectronico,
        direccion: formValue.direccion || '', // Ensure it's always a string
        telefono: formValue.telefono,
        provincia: formValue.provincia,
        usuario: {
          id: this.clienteId,
          username: formValue.nombreUsuario
        }
      };

      console.log('Enviando cliente actualizado:', clienteActualizado);

      this.clienteService.updateCliente(clienteActualizado)
        .pipe(
          catchError(err => {
            this.errorMensaje = 'Error al actualizar los datos. Por favor, intente nuevamente.';
            console.error('Error al actualizar cliente:', err);
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.formChanged = false;
          this.router.navigate(['/home'], {
            queryParams: { actualizado: 'true' }
          });
        });
    }
  }
}
