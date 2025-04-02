import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent implements OnInit {
  verificationForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar formulario con email y código
    this.verificationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationToken: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]]
    });
  }

  verifyCode(): void {
    if (this.verificationForm.invalid) {
      this.errorMessage = 'Por favor, ingresa un correo y un código válido.';
      return;
    }

    this.loading = true;

    const verificationData = {
      email: this.verificationForm.value.email,
      verificationToken: this.verificationForm.value.verificationToken
    };

    this.authService.verifyUserCode(verificationData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']); // Redirigir tras verificar
      },
      error: (error) => {
        this.errorMessage = 'Código incorrecto o expirado. Por favor, inténtalo de nuevo.';
        this.loading = false;
        console.error(error);
      }
    });
  }

}
