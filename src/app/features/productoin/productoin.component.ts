import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './productoin.component.html',
  styleUrls: ['./productoin.component.css']
})
export class ProductoinComponent implements OnInit {
  product: any;
  currentImageIndex: number = 0;
  quantity: number = 1; // Added quantity property

  constructor(private route: ActivatedRoute, private productService: ProductService,private chatService: ChatService, private router:Router ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const productId = Number(params['id']);
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  decodeToken(): any {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  startChat(): void {
    const token = localStorage.getItem('authToken');
    if (!token || !this.product?.id) {
      console.error("Falta token o producto.");
      return;
    }

    const userInfo = this.decodeToken();
    const compradorId = userInfo?.userId;
    const vendedorId = this.product.userId;

    if (!compradorId || !vendedorId) {
      console.error("Faltan datos para iniciar el chat.");
      return;
    }

    const chatData = {
      remitente: { id: compradorId },
      destinatario: { id: vendedorId },
      producto: { id: this.product.id }
    };

    console.log('JSON enviado al backend:', chatData);

    this.chatService.checkOrCreateChat(chatData, token).subscribe({
      next: (chat) => {
        // Redirige al chat existente o recién creado
        this.router.navigate(['/chat'], { queryParams: { chatId: chat.id } });
      },
      error: (err) => {
        console.error("Error al iniciar/crear chat:", err);
      }
    });
  }


  loadProduct(id: number): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró un token de autenticación.');
      return;
    }

    this.productService.getProductById(id, token).subscribe(
      (response: any) => {
        this.product = {
          id: response.id,
          name: response.nombre,
          category: response.tipo,
          description: response.descripcion,
          price: response.precio,
          clientName: response.clientName ?? 'Sin cliente', // Cambiado a response.clientName
          images: [response.imagen1, response.imagen2, response.imagen3, response.imagen4].filter((img) => img),
          isFavorite: response.esFavorito,
          userId: response.userId // <-- Aquí ya lo tienes
        };
      },
      (error: any) => {
        console.error('Error al cargar el producto:', error);
      }
    );
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  prevImage(): void {
    this.currentImageIndex = this.currentImageIndex > 0
      ? this.currentImageIndex - 1
      : this.product.images.length - 1;
  }

  nextImage(): void {
    this.currentImageIndex = this.currentImageIndex < this.product.images.length - 1
      ? this.currentImageIndex + 1
      : 0;
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
  }

  toggleFavorite(): void {
    this.product.isFavorite = !this.product.isFavorite;
  }

  addToCart(): void {
    // Aquí puedes implementar la lógica para agregar el producto al carrito
  }
  goToPayment(): void {

    this.router.navigate(['/payment'], {
      queryParams: {
        name: this.product.name,
        price: this.product.price
      }
    });
  }
}
