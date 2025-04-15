import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  styles: [`
    @keyframes rotate-y {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(180deg); }
    }

    .rotate-y-180 {
      transform: rotateY(180deg);
    }
  `],
  animations: [
    trigger('flipCard', [
      state('front', style({ transform: 'rotateY(0deg)' })),
      state('back', style({ transform: 'rotateY(180deg)' })),
      transition('front <=> back', animate('0.5s'))
    ])
  ]
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paymentMethod: 'card' | 'paypal' = 'card';
  cardFlipped = false;
  cardHover = false;
  cardTransform = '';
  showPaypalPassword = false;
  submitted = false;

  productName: string = '';
  productPrice: number = 0;

  // Fixed variables
  productos: any[] = [];
  total: number = 0;
  noProductos: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.paymentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9\s]{13,19}$/)]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      paypalEmail: [''],
      paypalPassword: [''],
      rememberPaypal: [false]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productName = params['name'];
      this.productPrice = params['price'];
      this.total = this.productPrice; // Asigna el precio al total

    });
  }

  get f() { return this.paymentForm.controls; }

  get displayCardNumber(): string {
    const value = this.paymentForm.get('cardNumber')?.value || '';
    return value || '•••• •••• •••• ••••';
  }

  get displayCardHolder(): string {
    const value = this.paymentForm.get('cardHolder')?.value || '';
    return value ? value.toUpperCase() : 'NOMBRE APELLIDO';
  }

  get displayExpiry(): string {
    const value = this.paymentForm.get('expiryDate')?.value || '';
    return value || 'MM/AA';
  }

  get displayCVC(): string {
    const value = this.paymentForm.get('cvc')?.value || '';
    return value || 'CVC';
  }

  selectPaymentMethod(method: 'card' | 'paypal'): void {
    this.paymentMethod = method;
    if (method === 'card') {
      setTimeout(() => {
        this.cardFlipped = false;
        this.cardHover = false;
      }, 10);
    }
  }

  moveCard(e: MouseEvent): void {
    if (!this.cardHover) return;
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 10;
    const rotateX = (y / (rect.height / 2)) * -10;
    this.cardTransform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }

  formatCardNumber(): void {
    let value = this.paymentForm.get('cardNumber')?.value || '';
    value = value.replace(/\s/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    this.paymentForm.get('cardNumber')?.setValue(formattedValue, { emitEvent: false });
  }

  formatExpiryDate(): void {
    let value = this.paymentForm.get('expiryDate')?.value || '';
    value = value.replace(/\//g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    this.paymentForm.get('expiryDate')?.setValue(value, { emitEvent: false });
  }

  togglePasswordVisibility(): void {
    this.showPaypalPassword = !this.showPaypalPassword;
  }

  processPaypalPayment(): void {
    const email = this.paymentForm.get('paypalEmail')?.value;
    const password = this.paymentForm.get('paypalPassword')?.value;
    if (!email || !password) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, introduce tu correo y contraseña de PayPal.',
        icon: 'error',
        confirmButtonColor: '#00D26A'
      });
      return;
    }
    Swal.fire({
      title: 'Procesando',
      text: 'Conectando con PayPal...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    setTimeout(() => {
      Swal.fire({
        title: '¡Pago completado!',
        text: 'Tu pago con PayPal se ha procesado correctamente.',
        icon: 'success',
        confirmButtonColor: '#00D26A'
      });
    }, 2000);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    }
    console.log('Formulario enviado:', this.paymentForm.value);
    Swal.fire({
      title: '¡Pago completado!',
      text: 'Tu pago se ha procesado correctamente.',
      icon: 'success',
      confirmButtonColor: '#00D26A'
    });
  }
}
