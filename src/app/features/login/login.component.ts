import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, ingresa un usuario y una contraseña válidos.';
      return;
    }

    this.loading = true;

    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log("Respuesta del servidor:", response);

        if (response && response.token) {
          console.log("Login exitoso");
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']);
        } else {
          console.error("Respuesta inesperada del servidor");
          alert("Error en la autenticación. Intenta nuevamente.");
        }

        this.loading = false;
      },
      error: (error) => {
        console.error("Error de autenticación", error);
        if (error.status === 403) {
          alert("Tu cuenta está baneada.");
        } else if (error.status === 401) {
          alert("Usuario o contraseña incorrectos.");
        } else {
          alert("Ocurrió un error. Intenta más tarde.");
        }

        this.loading = false;
      }
    });
  }


}
