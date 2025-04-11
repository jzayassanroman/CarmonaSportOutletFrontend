import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Validación para username
      password: ['', [Validators.required, Validators.minLength(6)]], // Asegurarse de que la contraseña tenga un mínimo de caracteres
      nombre: ['', Validators.required],  // Validación para el nombre del cliente
      apellido: ['', Validators.required],  // Validación para el apellido del cliente
      telefono: ['', Validators.required],  // Validación para el teléfono
      direccion: ['', Validators.required],  // Validación para la dirección
      email: ['', [Validators.required, Validators.email]]  // Validación para el email
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const userData = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      nombre: this.registerForm.value.nombre,
      apellido: this.registerForm.value.apellido,
      telefono: this.registerForm.value.telefono,
      direccion: this.registerForm.value.direccion,
      email: this.registerForm.value.email
    };

    this.authService.registerUser(userData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/verify']);  // Redirigir a otra página o vista
      },
      error: (error) => {
        this.errorMessage = 'Error en el registro';
        this.loading = false;
        console.error(error);
      }
    });
  }
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
