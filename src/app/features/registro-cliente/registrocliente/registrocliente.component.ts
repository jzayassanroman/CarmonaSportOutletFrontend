import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrocliente',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registrocliente.component.html',
  styleUrl: './registrocliente.component.css'
})
export class RegistroclienteComponent {
  clientForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  registerClient() {
    if (this.clientForm.invalid) return;
    this.loading = true;
    this.authService.registerClient(this.clientForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Error en el registro';
        this.loading = false;
        console.error(error);
      }
    });
  }

}
